import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPurchaseOrder, IProduct, ICompany, IUnit } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { PurchaseOrderDataService } from '../purchase.order/purchase.order.data.service';
import { ProductDataService } from '../product/product.data.service';
import { CompanyDataService } from '../company/company.data.service';
import { UnitDataService } from '../unit/unit.data.service';

@Component({
  selector: 'purchase-order-form-view',
  templateUrl: 'purchase.order.form.html'
})

export class PurchaseOrderFormComponent {
  products: IProduct[] = [];
  companies: ICompany[] = [];
  units: IUnit[] = [];
  @Input() purchaseOrder: IPurchaseOrder;
  @Output() onSavedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificationService: NotificationService,
    private purchaseOrderDataService: PurchaseOrderDataService,
    private productDataService: ProductDataService,
    private companyDataService: CompanyDataService,
    private unitDataService: UnitDataService
  ) {
    this.init();
  }

  init() {
    this.loadProducts();
    this.loadCompanies();
    this.loadUnits();
  }

  loadProducts() {
    this.productDataService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });
  }

  loadCompanies() {
    this.companyDataService.getCompanies().subscribe((companies: ICompany[]) => {
      this.companies = companies;
    });
  }

  loadUnits() {
    this.unitDataService.getUnits().subscribe((units: IUnit[]) => {
      this.units = units;
    });
  }

  onSave() {
    if (this.purchaseOrder.Id > 0) {
      this.purchaseOrderDataService.updatePurchaseOrder(this.purchaseOrder).subscribe(() => {
        this.notificationService.printSuccessMessage('company saved successful');
        this.onSavedEvent.emit(true);
      });
      return;
    }
    this.purchaseOrderDataService.createPurchaseOrder(this.purchaseOrder).subscribe(() => {
      this.notificationService.printSuccessMessage('company saved successful');
      this.onSavedEvent.emit(true);
    });
  }
}