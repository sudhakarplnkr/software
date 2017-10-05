import { Component, EventEmitter, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IProduct, IUnit, IPurchaseOrder, IBillInfo, ISalesOrder, ICompany } from '../shared/interfaces';
import { TotalViewModel } from '../shared/classes';
import { CalculatorService } from '../billing/calculator.service';
import { NotificationService } from '../utils/notification.service';
import { BillInfoDataService } from '../billing/billInfo.data.service';
import { CompanyDataService } from '../company/company.data.service';
import { Observable } from 'rxjs/Observable';

import _ from "lodash";

@Component({
  selector: 'billing-home',
  templateUrl: './billing.component.html',
  styleUrls: ['../app.component.css', './billing.component.css'],
  providers: [CalculatorService]
})

export class BillingComponent implements OnInit, AfterViewChecked {

  constructor(public calculatorService: CalculatorService,
    private billInfoDataService: BillInfoDataService,
    private companyDataService: CompanyDataService,
    private notificationService: NotificationService) { }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  public exportTriggeringEventEmitter = new EventEmitter<boolean>();

  purchaseOrders: IPurchaseOrder[] = [];
  salesOrder: ISalesOrder = {} as ISalesOrder;
  billInfo: IBillInfo = {} as IBillInfo;
  totalViewModel = new TotalViewModel();
  currentDate: Observable<Date>;

  ngOnInit() {
    this.scrollToBottom();
    this.billInfo.Date = new Date();
    this.billInfo.SalesOrders = [];
    this.currentDate = Observable.timer(10).map(x => new Date());    
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  selectedItems(product: IProduct) {
    let selectedProduct = Object.assign({}, product);
    this.salesOrder.ProductId = selectedProduct.Id;
    this.salesOrder.ProductDescription = selectedProduct.TamilName;
    if (product.PurchaseOrders.length > 0) {
      let purchaseOrder = selectedProduct.PurchaseOrders[0];
      this.purchaseOrders = selectedProduct.PurchaseOrders;
      this.loadOrder(purchaseOrder);
    }
    this.myFocusTriggeringEventEmitter.emit(true);
  }

  onUnitChange(unitId: string) {
    let selectedOrder = _.find(this.purchaseOrders, { UnitId: parseInt(unitId) });
    this.loadOrder(selectedOrder);
  }

  loadOrder(purchaseOrder: IPurchaseOrder) {

    this.salesOrder.UnitId = purchaseOrder.Unit.Id;
    this.salesOrder.UnitCode = purchaseOrder.Unit.Code;
    this.salesOrder.CompanyId = purchaseOrder.Company.Id;
    this.salesOrder.CompanyName = purchaseOrder.Company.Name;
    this.salesOrder.Unit = purchaseOrder.Unit;
    this.salesOrder.PerUnitPrice = purchaseOrder.PerUnitPrice;
    this.salesOrder.ActualPrice = purchaseOrder.PerUnitPrice;
    this.salesOrder.Cgst = purchaseOrder.Cgst;
    this.salesOrder.Sgst = purchaseOrder.Sgst;
    this.salesOrder.CurrentStock = purchaseOrder.CurrentStock;
    this.salesOrder.Quantity = 1;
  }

  addItemToBill() {
    if (this.salesOrder.Quantity > this.salesOrder.CurrentStock) {
      this.notificationService.printErrorMessage('check stock.');
      return;
    }
    if (this.salesOrder.PerUnitPrice === undefined) {
      return;
    }

    this.salesOrder.CgstAmount = this.calculatorService.calculateCgstAmount(this.salesOrder);
    this.salesOrder.SgstAmount = this.calculatorService.calculateSgstAmount(this.salesOrder);
    this.salesOrder.TaxableAmout = this.calculatorService.calculateItemWithOutTaxAmount(this.salesOrder);
    this.salesOrder.Amount = this.calculatorService.calculateItemAmount(this.salesOrder);

    this.billInfo.SalesOrders.push(Object.assign({}, this.salesOrder));
    this.totalViewModel = this.calculatorService.calculateTotal(this.billInfo);
    this.purchaseOrders = [];
    this.salesOrder = {} as ISalesOrder;
  }

  removeBillItem(item: ISalesOrder) {
    let index: number = this.billInfo.SalesOrders.indexOf(item);
    if (index !== -1) {
      this.billInfo.SalesOrders.splice(index, 1);
      this.totalViewModel = this.calculatorService.calculateTotal(this.billInfo);
    }
  }

  SaveAndprintBill() {

  }

  IsValid() {
    if (!this.billInfo.CompanyName) {
      this.notificationService.printErrorMessage('please enter customer name.');
      return false;
    }
    if (this.billInfo.Mobile && !this.isValidMobileNumber(this.billInfo.Mobile)) {
      this.notificationService.printErrorMessage('please enter valid mobile number.');
      return false;
    }
    return true;
  }

  saveBill() {
    if (!this.IsValid()) {
      return;
    }
    this.billInfo.BillCode = new Date().getTime();
    this.billInfo.Total = this.totalViewModel.total;
    this.billInfoDataService.createBillInfo(this.billInfo).subscribe(() => {
      this.clearBill();
      this.notificationService.printSuccessMessage('bill information saved successfully.');
    });
  }
  private isValidMobileNumber(mobileNumber: number) {
    if (!mobileNumber || isNaN(mobileNumber) || mobileNumber.toString().length !== 10) {
      return false;
    }
    return true;
  }
  searchCustomer() {
    if (!this.isValidMobileNumber(this.billInfo.Mobile)) {
      return;
    }
    this.companyDataService.getCompanyByMobile(this.billInfo.Mobile).subscribe((company: ICompany) => {
      if(!company){
        return;
      }
      this.notificationService.printSuccessMessage('found customer details.');
      this.billInfo.Aadhar = company.AadharNumber;
      this.billInfo.Address = company.Address;
      this.billInfo.GstNumber = company.GstNumber;
      this.billInfo.Mobile = company.Mobile;
      this.billInfo.CompanyName = company.Name;
      this.billInfo.Phone = company.Phone;
      this.billInfo.TinNumber = company.TinNumber;
      this.billInfo.PanNumber = company.PanNumber;
      this.billInfo.Balance = company.Balance;
    });
  }

  clearBill() {
    this.billInfo = { SalesOrders: [] } as IBillInfo;
    this.salesOrder = {} as ISalesOrder;
    this.totalViewModel = new TotalViewModel();
  }

  cancelBill() {
    this.clearBill();
  }
}
