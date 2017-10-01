import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { ICompany } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { CompanyDataService } from '../company/company.data.service';

@Component({
  selector: 'company-form-view',
  templateUrl: 'company.form.html'
})

export class CompanyFormComponent {
  @Input() company: ICompany;
  @Output() onSavedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificationService: NotificationService,
    private companyDataService: CompanyDataService) {
  }

  onSave() {
    if (this.company.Id > 0) {
      this.companyDataService.updateCompany(this.company).subscribe(() => {
        this.notificationService.printSuccessMessage('company saved successful');
        this.onSavedEvent.emit(true);
      });
      return;
    }
    this.companyDataService.createCompany(this.company).subscribe(() => {
      this.notificationService.printSuccessMessage('company saved successful');
      this.onSavedEvent.emit(true);
    });
  }
}