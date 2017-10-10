import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { ProductDataService } from '../product/product.data.service';
import { Constants } from '../utils/constants';

@Component({
  selector: 'product-form-view',
  templateUrl: 'product.form.html',
  styles: ['../app.component.css']
})

export class ProductFormComponent {
  @Input() product: IProduct;
  @Output() onSavedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private notificationService: NotificationService,
    private productDataService: ProductDataService) {
  }

  private isModelValid(): boolean {
    if (!this.product.Description || !this.product.TamilName) {
      this.notificationService.printErrorMessage(Constants.MANDATORY_MESSAGE);
      return false;
    }
    return true;
  }

  onSave() {
    
    if (!this.isModelValid()) {
      return;
    }

    if (this.product.Id > 0) {
      this.productDataService.updateProduct(this.product).subscribe((status: number) => {
        if (status === 412) {
          this.notificationService.printErrorMessage('product' + Constants.ALREADY_EXIST_MESSAGE);
          return;
        }
        this.notificationService.printSuccessMessage('product' + Constants.SAVE_SUCCESS_MESSAGE);
        this.onSavedEvent.emit(true);
      }, error => {
        this.notificationService.printErrorMessage(Constants.SAVE_ERROR_MESSAGE + 'product');
      });
      return;
    }
    this.productDataService.createProduct(this.product).subscribe((status: number) => {
      if (status === 412) {
        this.notificationService.printErrorMessage('product' + Constants.ALREADY_EXIST_MESSAGE);
        return;
      }
      this.onSavedEvent.emit(true);
      this.notificationService.printSuccessMessage('product' + Constants.SAVE_SUCCESS_MESSAGE);;
    }, error => {
      this.notificationService.printErrorMessage(Constants.SAVE_ERROR_MESSAGE + 'product');
    });
  }
}