import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../utils/config.service';
import { IUnit } from '../shared/interfaces';
import { UnitDataService } from '../unit/unit.data.service';
import { NotificationService } from '../utils/notification.service';

@Component({
  selector: 'unit-grid-view',
  templateUrl: 'unit.component.html'
})
export class UnitComponent {
  unitSearchText: string;
  unit: IUnit = {} as IUnit;
  units: IUnit[] = [];
  isAdd: boolean = false;
  isEdit: boolean = false;
  constructor(public http: Http, public configService: ConfigService, private unitDataService: UnitDataService,
    private notificationService: NotificationService) {
    this.loadData();
  }

  AddUnit() {
    this.isAdd = true;
    if (this.isAdd && !this.unit.Id) {
      this.unit = {} as IUnit;
    }
  }

  onSavedEvent() {
    this.loadData();
  }

  onEdit(unit: IUnit) {
    this.isEdit = true;
    this.unit = Object.assign({}, unit);
  }

  OnCancel() {
    this.isEdit = false;
    this.isAdd = false;
    this.unit = {} as IUnit;
  }

  onDelete(unit: IUnit) {
    this.unitDataService.deleteUnit(unit.Id)
      .subscribe(() => {
        this.loadData();
        this.notificationService.printSuccessMessage('unit deleted successfully.');;
      });
  }

  loadData() {
    this.unitDataService.getUnits()
      .subscribe((response) => {
        this.units = response;
      });
  }
}