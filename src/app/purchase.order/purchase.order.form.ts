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
  @Input() isEdit: boolean;
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
    if (!this.IsValid()) {
      return;
    }
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

  private IsValid(): boolean {
    if (!this.purchaseOrder.ProductId) {
      this.notificationService.printErrorMessage('please select product');
      return false;
    }
    if (!this.purchaseOrder.CompanyId) {
      this.notificationService.printErrorMessage('please select company');
      return false;
    }
    if (!this.purchaseOrder.UnitId) {
      this.notificationService.printErrorMessage('please select unit');
      return false;
    }
    if (!this.purchaseOrder.PerUnitPrice) {
      this.notificationService.printErrorMessage('please enter price per unit');
      return false;
    }
    if (!this.purchaseOrder.SalesPrice) {
      this.notificationService.printErrorMessage('pplease enter sales price');
      return false;
    }
    if (!this.purchaseOrder.ReSalesPrice) {
      this.notificationService.printErrorMessage('please enter resales price');
      return false;
    }
    if (!this.purchaseOrder.OpeningStock) {
      this.notificationService.printErrorMessage('please enter opening stock');
      return false;
    }
    return true;
  }
}