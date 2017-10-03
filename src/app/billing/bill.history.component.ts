import { Component } from '@angular/core';
import { IBillInfo } from '../shared/interfaces';
import { BillInfoDataService } from '../billing/billInfo.data.service';
import { NotificationService } from '../utils/notification.service';
import { CalculatorService } from '../billing/calculator.service';

@Component({
  selector: 'billing-grid-view',
  templateUrl: 'bill.history.component.html'
})
export class BillHistoryComponent {
  billSearchText: string;
  billInfo: IBillInfo[] = [];
  billDetails: any;
  constructor(
    private billInfoDataService: BillInfoDataService,
    private calculatorService: CalculatorService,
    private notificationService: NotificationService) {
    this.loadData();
  }

  loadData() {
    this.billInfoDataService.getBillInfo()
      .subscribe((response: IBillInfo[]) => {
        this.billInfo = response;
      });
  }

  onView(item: IBillInfo){
    this.billDetails = item;
    this.billDetails.totalViewModel = this.calculatorService.calculateTotal(item);
  }
}