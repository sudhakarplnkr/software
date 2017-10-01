import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { ProductDataService } from '../product/product.data.service';

@Component({
  selector: 'product-form-view',
  templateUrl: 'product.form.html'
})

export class ProductFormComponent {
  @Input() product: IProduct;
  @Output() onSavedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificationService: NotificationService,
    private productDataService: ProductDataService) {      
  }

  onSave() {
    if (this.product.Id > 0) {
      this.productDataService.updateProduct(this.product).subscribe(() => {
        this.notificationService.printSuccessMessage('company saved successful');
        this.onSavedEvent.emit(true);
      });
      return;
    }
    this.productDataService.createProduct(this.product).subscribe(() => {
      this.notificationService.printSuccessMessage('company saved successful');
      this.onSavedEvent.emit(true);
    });
  }
}