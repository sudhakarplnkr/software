import { Component, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../utils/config.service';
import { ICompany } from '../shared/interfaces';
import { CompanyDataService } from '../company/company.data.service';
import { NotificationService } from '../utils/notification.service';

@Component({
  selector: 'unit-grid-view',
  templateUrl: 'company.component.html'
})
export class CompanyComponent {
  companySearchText: string;
  company: ICompany = {} as ICompany;
  companies: ICompany[] = [];
  isAdd: boolean = false;
  isEdit: boolean = false;
  constructor(
    public configService: ConfigService,
    private companyDataService: CompanyDataService,
    private notificationService: NotificationService) {
    this.loadData();
  }

  AddCompany() {
    this.isAdd = true;
    if (this.isAdd && !this.company.Id) {
      this.company = {} as ICompany;
    }
  }

  onSavedEvent() {
    this.loadData();
  }

  onEdit(company: ICompany) {
    this.isEdit = true;
    this.company = Object.assign({}, company);
  }

  OnCancel() {
    this.isEdit = false;
    this.isAdd = false;
    this.company = {} as ICompany;
  }

  onDelete(company: ICompany) {
    this.companyDataService.deleteCompany(company.Id)
      .subscribe(() => {
        this.loadData();
        this.notificationService.printSuccessMessage('company deleted successfully.');
      });
  }

  loadData() {
    this.companyDataService.getCompanies()
      .subscribe((response: ICompany[]) => {
        this.companies = response;
      });
  }
}