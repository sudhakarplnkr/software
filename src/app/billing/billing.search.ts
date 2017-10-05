import { Component, Input, Output, EventEmitter, DoCheck, OnChanges } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { ProductDataService } from '../product/product.data.service';
import { IProduct } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
@Component({
  selector: 'text-search',
  styleUrls: ['./billing.component.css'],
  template: `<div class="form-group col-md-11"><ng2-completer (selected)="onSelected($event)" [inputClass]="'form-control'" 
  [placeholder]="'search'" [dataService]="dataService" [minSearchLength]="0"></ng2-completer>
  </div>
  <div class="form-group col-md-1">
  <i class="fa fa-refresh product-refresh" (click)="refreshProduct()" aria-hidden="true"></i>
</div>
  `
})
export class SearchComponent implements OnChanges {
  ngOnChanges(): void {
    console.log('on change');
  }

  @Output() selectedItems: EventEmitter<IProduct> = new EventEmitter();

  public dataService: CompleterData;

  constructor(private completerService: CompleterService, private productDataService: ProductDataService,
    private notificationService: NotificationService) {
    this.loadProducts();
  }

  private loadProducts() {
    this.productDataService.getProducts()
      .subscribe((product: IProduct[]) => {
        this.dataService = this.completerService.local(product, 'Description', 'TamilName');
      });
  }

  refreshProduct() {
    this.loadProducts();
  }

  onSelected(item: CompleterItem) {
    if (item === null) {
      return;
    }
    this.selectedItems.emit(item.originalObject);
  }
}