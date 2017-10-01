import { Component, Input, Output, EventEmitter, DoCheck, OnChanges } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { ProductDataService } from '../product/product.data.service';
import { IProduct } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
@Component({
  selector: 'text-search',
  template: `<ng2-completer (selected)="onSelected($event)" [inputClass]="'form-control'" 
  [placeholder]="'search'" [dataService]="dataService" [minSearchLength]="0"></ng2-completer>
  `
})
export class SearchComponent implements OnChanges {
  ngOnChanges(): void {
    console.log('on change');
  }

  @Output() selectedItems: EventEmitter<IProduct> = new EventEmitter();

  private dataService: CompleterData;

  constructor(private completerService: CompleterService, private productDataService: ProductDataService,
    private notificationService: NotificationService) {
    this.productDataService.getProducts()
      .subscribe((product: IProduct[]) => {
        this.dataService = this.completerService.local(product, 'Description', 'TamilName');
      });
  }

  protected onSelected(item: CompleterItem) {
    if (item === null) {
      return;
    }
    this.selectedItems.emit(item.originalObject);
  }
}