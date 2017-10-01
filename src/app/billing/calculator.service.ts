import { Injectable } from '@angular/core';
import { ISalesOrder } from '../shared/interfaces';

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
}
