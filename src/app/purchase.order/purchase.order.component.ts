import { Component } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { IPurchaseOrder } from '../shared/interfaces';
import { PurchaseOrderDataService } from '../purchase.order/purchase.order.data.service';
import { NotificationService } from '../utils/notification.service';
import { UnitDataService } from '../unit/unit.data.service';
import { PurchaseOrderFormComponent } from '../purchase.order/purchase.order.form';

@Component({
  selector: 'purchase-order-grid-view',
  templateUrl: 'purchase.order.component.html'
})
export class PurchaseOrderComponent {
  purchaseOrders: IPurchaseOrder[] = [];
  purchaseOrderSearchText: string;
  isAdd: boolean = false;
  isEdit: boolean = false;
  currentPageNumber: number = 1;
  pageSize: number = 10;
  totalPageNumber: number[];
  currentPageItems: IPurchaseOrder[] = [];
  purchaseOrder: IPurchaseOrder = {} as IPurchaseOrder;
  constructor(private purchaseOrderDataService: PurchaseOrderDataService,
    private notificationService: NotificationService) {
    this.loadData();
  }

  refreshPurchaseOrder(){
    this.loadData();
  }

  addPurchaseOrder() {
    this.isAdd = true;
    this.isEdit = false;
    this.purchaseOrder = {} as IPurchaseOrder;
  }
  onSavedEvent() {
    this.isAdd = false;
    this.isEdit = false;
    this.purchaseOrder = {} as IPurchaseOrder;
    this.loadData();
  }
  onEdit(purchaseOrder: IPurchaseOrder) {
    this.isEdit = true;
    this.isAdd = false;
    this.purchaseOrder = Object.assign({}, purchaseOrder);
  }

  onCancel() {
    this.isEdit = false;
    this.isAdd = false;
    this.purchaseOrder = {} as IPurchaseOrder;
  }

  loadData() {
    this.purchaseOrderDataService.getPurchaseOrders()
      .subscribe((response) => {
        this.purchaseOrders = response;
        this.setPageOptions(this.purchaseOrders);
        this.currentPageNumber = 1;
      });
  }

  onDelete(prodcuct: IPurchaseOrder) {
    this.purchaseOrderDataService.deletePurchaseOrder(prodcuct.Id)
      .subscribe(() => {
        this.loadData();
        this.notificationService.printSuccessMessage('purchase order deleted successfully');
      });
  }

  onPageChange(currentPageNumber) {
    if (currentPageNumber <= 0 || currentPageNumber > this.totalPageNumber.length) {
      return;
    }
    this.currentPageNumber = currentPageNumber;
    let purchaseOrders = this.purchaseOrders;
    if (this.purchaseOrderSearchText) {
      purchaseOrders = this.filterBySearch();
    }
    this.setPageOptions(purchaseOrders);
  }

  onPurchaseOrderSearch() {
    this.currentPageNumber = 1;
    this.setPageOptions(this.filterBySearch());
  }

  filterBySearch(): IPurchaseOrder[] {
    let filteredProduct = this.purchaseOrders
      .filter((purchaseOrder: IPurchaseOrder) => purchaseOrder.Product.Description.toLowerCase().indexOf(this.purchaseOrderSearchText.toLowerCase()) >= 0);
    this.setPageOptions(filteredProduct);
    return filteredProduct;
  }

  setPageOptions(purchaseOrders: IPurchaseOrder[]) {
    this.currentPageItems = purchaseOrders.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize);
    let pages = Math.ceil(purchaseOrders.length / this.pageSize);
    this.totalPageNumber = Array(pages).fill(1).map((x, i) => i + 1);
  }
}