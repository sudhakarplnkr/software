import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2CompleterModule } from 'ng2-completer';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { SearchFilterPipe } from './utils/search.filter';
import { InputNumbersOnly } from './utils/input.number.only';
import { Http } from '@angular/http';
import { ExtendedHttpService } from './spinner/extended.http.service';

// components
import { UnitComponent } from './unit/unit.component';
import { PurchaseOrderComponent } from './purchase.order/purchase.order.component';
import { BillingComponent } from './billing/billing.component';
import { CompanyComponent } from './company/company.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './billing/billing.search';
import { BillHistoryComponent } from './billing/bill.history.component';
import { BillViewComponent } from './billing/bill.view.component';

// helper service
import { ConfigService } from './utils/config.service';
import { HelperService } from './utils/helper.service';
import { NotificationService } from './utils/notification.service';
import { FocusDirective } from './utils/focus.directive';

// factory
import { ProductFactory } from './product/product.factory';
import { CalculatorService } from './billing/calculator.service';

// form component
import { ProductFormComponent } from './product/product.form';
import { UnitFormComponent } from './unit/unit.form';
import { CompanyFormComponent } from './company/company.form';
import { PurchaseOrderFormComponent } from './purchase.order/purchase.order.form';

// data services
import { ProductDataService } from './product/product.data.service';
import { UnitDataService } from './unit/unit.data.service';
import { CompanyDataService } from './company/company.data.service';
import { PurchaseOrderDataService } from './purchase.order/purchase.order.data.service';
import { BillInfoDataService } from './billing/billInfo.data.service';
import { SharedService } from './shared/shared.service';

// routing
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: BillingComponent },
  { path: 'Billing', component: BillingComponent },
  { path: 'PurchaseOrder', component: PurchaseOrderComponent },
  { path: 'Product', component: ProductComponent },
  { path: 'Unit', component: UnitComponent },
  { path: 'Company', component: CompanyComponent },
  { path: 'BillHistory', component: BillHistoryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    PurchaseOrderComponent,
    ProductComponent,
    UnitComponent,
    CompanyComponent,
    SearchComponent,
    FocusDirective,
    ProductFormComponent,
    UnitFormComponent,
    CompanyFormComponent,
    PurchaseOrderFormComponent,
    BillHistoryComponent,
    BillViewComponent,
    SearchFilterPipe,
    InputNumbersOnly
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    Ng2CompleterModule,
    FormsModule,
    Ng2FilterPipeModule,
    Angular2FontawesomeModule
  ],
  providers: [ProductDataService, ConfigService, NotificationService, CalculatorService, UnitDataService, CompanyDataService,
    PurchaseOrderDataService,
    BillInfoDataService,
    HelperService,
    ProductFactory,
    { provide: Http, useClass: ExtendedHttpService },
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }