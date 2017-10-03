import { Component, Input } from '@angular/core';
import { IBillInfo } from '../shared/interfaces';
import { CalculatorService } from '../billing/calculator.service';
import { NotificationService } from '../utils/notification.service';
import { BillInfoDataService } from '../billing/billInfo.data.service';

import _ from "lodash";

@Component({
  selector: 'bill-view',
  templateUrl: './bill.view.html',
  styleUrls: ['../app.component.css', './billing.component.css'],
  providers: [CalculatorService]
})

export class BillViewComponent {
  @Input() billInfo: IBillInfo;
  constructor(
    private billInfoDataService: BillInfoDataService,
    private calculatorService: CalculatorService,
    private notificationService: NotificationService) {
  }
}
