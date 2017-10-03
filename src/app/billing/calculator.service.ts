import { Injectable } from '@angular/core';
import { ISalesOrder, IBillInfo } from '../shared/interfaces';
import { TotalViewModel } from '../shared/classes';

@Injectable()
export class CalculatorService {
    constructor() { }

    currencyRoundOff(amout: number): number {
        return Math.round(amout * Math.pow(10, 2)) / Math.pow(10, 2);
    }

    calculateCgstAmount(item: ISalesOrder): number {
        var amout = item.Quantity * item.PerUnitPrice;
        return this.currencyRoundOff((item.Cgst * amout / 100));
    }

    calculateSgstAmount(item: ISalesOrder): number {
        var amout = item.Quantity * item.PerUnitPrice;
        return this.currencyRoundOff((item.Sgst * amout / 100));
    }

    calculateItemAmount(item: ISalesOrder) {
        var amout = this.currencyRoundOff(item.Quantity * item.PerUnitPrice);
        return this.currencyRoundOff(this.calculateCgstAmount(item) + this.calculateSgstAmount(item) + amout);
    }

    calculateItemWithOutTaxAmount(item: ISalesOrder) {
        var amout = this.currencyRoundOff(item.Quantity * item.PerUnitPrice);
        return amout;
    }

    calculateTotal(billInfo: IBillInfo) {
        let totalModel = new TotalViewModel();
        let totalWithOutTax: number = 0;
        let totalCgstAmount: number = 0;
        let totalSgstAmount: number = 0;

        if (!billInfo.SalesOrders) {
            return totalModel;
        }
        billInfo.SalesOrders.forEach(item => {
            let amout = this.calculateItemWithOutTaxAmount(item);
            let cgstAmount = this.calculateCgstAmount(item);
            let sgstAmount = this.calculateSgstAmount(item);
            totalCgstAmount += cgstAmount;
            totalSgstAmount += sgstAmount
            totalWithOutTax += amout;
            if (item.Cgst === 2.5) {
                totalModel.twoHalfCgstAmount += amout;
                totalModel.twoHalfCgstTax += cgstAmount;
                totalModel.twoHalfSgstAmount += amout;
                totalModel.twoHalfSgstTax += sgstAmount;
            } else if (item.Cgst === 6) {
                totalModel.sixCgstAmount += amout;
                totalModel.sixCgstTax += cgstAmount;
                totalModel.sixSgstAmount += amout;
                totalModel.sixSgstTax += sgstAmount;
            } else if (item.Cgst === 9) {
                totalModel.nineCgstAmount += amout;
                totalModel.nineCgstTax += cgstAmount;
                totalModel.nineSgstAmount += amout;
                totalModel.nineSgstTax += sgstAmount;
            } else if (item.Cgst === 14) {
                totalModel.fourteenCgstAmount += amout;
                totalModel.fourteenCgstTax += cgstAmount;
                totalModel.fourteenSgstAmount += amout;
                totalModel.fourteenSgstTax += sgstAmount;
            }
        });
        totalModel.totalWithOutTax = this.currencyRoundOff(totalWithOutTax);
        totalModel.totalCgst = this.currencyRoundOff(totalCgstAmount);
        totalModel.totalSgst = this.currencyRoundOff(totalSgstAmount);
        totalModel.total = this.currencyRoundOff(totalModel.totalWithOutTax + totalModel.totalCgst + totalModel.totalSgst);

        return totalModel;
    }
}
