import { Component } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { IProduct } from '../shared/interfaces';
import { ProductDataService } from '../product/product.data.service';
import { NotificationService } from '../utils/notification.service';
import { UnitDataService } from '../unit/unit.data.service';
import { ProductFormComponent } from '../product/product.form';

@Component({
  selector: 'product-grid-view',
  templateUrl: 'product.component.html'
})
export class ProductComponent {
  products: IProduct[] = [];
  productSearchText: string;
  isAdd: boolean = false;
  isEdit: boolean = false;
  currentPageNumber: number = 1;
  pageSize: number = 10;
  totalPageNumber: number[];
  currentPageItems: IProduct[] = [];
  product: IProduct = {} as IProduct;
  constructor(private productDataService: ProductDataService,
    private notificationService: NotificationService) {
    this.loadData();
  }

  AddProduct() {
    this.isAdd = true;
    if (this.isAdd && !this.product.Id) {
      this.product = {} as IProduct;
      this.product.Code = new Date().getTime().toString();
    }
  }
  onSavedEvent() {
    this.loadData();
    this.OnCancel();
  }
  onEdit(product: IProduct) {
    this.isEdit = true;
    this.product = Object.assign({}, product);
  }

  OnCancel() {
    this.isEdit = false;
    this.isAdd = false;
    this.product = {} as IProduct;
  }

  loadData() {
    this.productDataService.getProducts()
      .subscribe((response) => {
        this.products = response;
        this.setPageOptions(this.products);
        this.currentPageNumber = 1;
      });
  }

  onDelete(prodcuct: IProduct) {
    this.productDataService.deleteProduct(prodcuct.Id)
      .subscribe(() => {
        this.loadData();
        this.notificationService.printSuccessMessage('product deleted successfully');
      });
  }

  onPageChange(currentPageNumber) {
    if (currentPageNumber <= 0 || currentPageNumber > this.totalPageNumber.length) {
      return;
    }
    this.currentPageNumber = currentPageNumber;
    let products = this.products;
    if (this.productSearchText) {
      products = this.filterBySearch();
    }
    this.setPageOptions(products);
  }

  onProductSearch() {
    this.currentPageNumber = 1;
    this.setPageOptions(this.filterBySearch());
  }

  filterBySearch(): IProduct[] {
    let filteredProduct = this.products
      .filter((product: IProduct) => product.Description.toLowerCase().indexOf(this.productSearchText.toLowerCase()) >= 0);
    this.setPageOptions(filteredProduct);
    return filteredProduct;
  }

  setPageOptions(products: IProduct[]) {
    this.currentPageItems = products.slice((this.currentPageNumber - 1) * this.pageSize, this.currentPageNumber * this.pageSize);
    let pages = Math.ceil(products.length / this.pageSize);
    this.totalPageNumber = Array(pages).fill(1).map((x, i) => i + 1);
  }
}