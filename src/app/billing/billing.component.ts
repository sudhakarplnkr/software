import { Component, EventEmitter, AfterViewChecked, ElementRef, ViewChild, OnInit } from '@angular/core';
import { IProduct, IUnit, IPurchaseOrder, IBillInfo, ISalesOrder, ICompany } from '../shared/interfaces';
import { CalculatorService } from '../billing/calculator.service';
import { NotificationService } from '../utils/notification.service';

import _ from "lodash";

@Component({
  selector: 'billing-home',
  templateUrl: './billing.component.html',
  styleUrls: ['../app.component.css', './billing.component.css'],
  providers: [CalculatorService]
})

export class BillingComponent implements OnInit, AfterViewChecked {

  constructor(private calculatorService: CalculatorService,
    private notificationService: NotificationService) { }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  public myFocusTriggeringEventEmitter = new EventEmitter<boolean>();
  public exportTriggeringEventEmitter = new EventEmitter<boolean>();

  purchaseOrders: IPurchaseOrder[] = [];
  salesOrder: ISalesOrder = {} as ISalesOrder;
  billInfo: IBillInfo = {} as IBillInfo;
  ngOnInit() {
    this.scrollToBottom();
    this.billInfo.Date = new Date();
    this.billInfo.SalesOrders = [];
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  public totalWithOutTax: number = 0;
  public totalCgst: number = 0;
  public totalSgst: number = 0;

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
    this.salesOrder.ActualPrice = Object.assign({}, purchaseOrder.PerUnitPrice);
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
    this.calculateTotal();
    this.purchaseOrders = [];
    this.salesOrder = {} as ISalesOrder;
  }

  removeBillItem(item: ISalesOrder) {
    let index: number = this.billInfo.SalesOrders.indexOf(item);
    if (index !== -1) {
      this.billInfo.SalesOrders.splice(index, 1);
      this.calculateTotal();
    }
  }

  SaveAndprintBill() {

  }

  saveBill() {
    console.log(this.billInfo);
  }
  cancelBill() {
    this.billInfo.SalesOrders = [];
    this.salesOrder = {} as ISalesOrder;
    this.calculateTotal();
  }

  public twoHalfCgstAmount: number = 0;
  public twoHalfCgstTax: number = 0;
  public twoHalfSgstAmount: number = 0;
  public twoHalfSgstTax: number = 0;

  public sixCgstAmount: number = 0;
  public sixCgstTax: number = 0;
  public sixSgstAmount: number = 0;
  public sixSgstTax: number = 0;

  public nineCgstAmount: number = 0;
  public nineCgstTax: number = 0;
  public nineSgstAmount: number = 0;
  public nineSgstTax: number = 0;

  public fourteenCgstAmount: number = 0;
  public fourteenCgstTax: number = 0;
  public fourteenSgstAmount: number = 0;
  public fourteenSgstTax: number = 0;

  calculateTotal() {
    var totalWithOutTax: number = 0;
    var totalCgstAmount: number = 0;
    var totalSgstAmount: number = 0;

    this.twoHalfCgstAmount = 0;
    this.twoHalfCgstTax = 0;
    this.twoHalfSgstAmount = 0;
    this.twoHalfSgstTax = 0;

    this.sixCgstAmount = 0;
    this.sixCgstTax = 0;
    this.sixSgstAmount = 0;
    this.sixSgstTax = 0;

    this.nineCgstAmount = 0;
    this.nineCgstTax = 0;
    this.nineSgstAmount = 0;
    this.nineSgstTax = 0;

    this.fourteenCgstAmount = 0;
    this.fourteenCgstTax = 0;
    this.fourteenSgstAmount = 0;
    this.fourteenSgstTax = 0;

    this.billInfo.SalesOrders.forEach(item => {
      var amout = this.calculatorService.calculateItemWithOutTaxAmount(item);
      var cgstAmount = this.calculatorService.calculateCgstAmount(item);
      var sgstAmount = this.calculatorService.calculateSgstAmount(item);
      totalCgstAmount += cgstAmount;
      totalSgstAmount += sgstAmount
      totalWithOutTax += amout;
      if (item['Cgst'] === 2.5) {
        this.twoHalfCgstAmount += amout;
        this.twoHalfCgstTax += cgstAmount;
        this.twoHalfSgstAmount += amout;
        this.twoHalfSgstTax += sgstAmount;
      } else if (item['Cgst'] === 6) {
        this.sixCgstAmount += amout;
        this.sixCgstTax += cgstAmount;
        this.sixSgstAmount += amout;
        this.sixSgstTax += sgstAmount;
      } else if (item['Cgst'] === 9) {
        this.nineCgstAmount += amout;
        this.nineCgstTax += cgstAmount;
        this.nineSgstAmount += amout;
        this.nineSgstTax += sgstAmount;
      } else if (item['Cgst'] === 14) {
        this.fourteenCgstAmount += amout;
        this.fourteenCgstTax += cgstAmount;
        this.fourteenSgstAmount += amout;
        this.fourteenSgstTax += sgstAmount;
      }
    });
    this.totalWithOutTax = this.calculatorService.currencyRoundOff(totalWithOutTax);
    this.totalCgst = this.calculatorService.currencyRoundOff(totalCgstAmount);
    this.totalSgst = this.calculatorService.currencyRoundOff(totalSgstAmount);
  }
}
