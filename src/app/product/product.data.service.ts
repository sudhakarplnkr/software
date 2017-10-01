import { Injectable } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../utils/config.service';
import { HelperService } from '../utils/helper.service';
import { NotificationService } from '../utils/notification.service';
import { IProduct } from '../shared/interfaces';

@Injectable()
export class ProductDataService {
  private productUrl: string = '';
  constructor(private http: Http,
    private configService: ConfigService,
    private helperService: HelperService,
    private notificationService: NotificationService) {
    this.productUrl = configService.getApiURI() + 'product/';
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get(this.productUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    let options = this.helperService.buildHeaders(RequestMethod.Post);

    return this.http.post(this.productUrl, product, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    let options = this.helperService.buildHeaders(RequestMethod.Put);
    return this.http.put(this.productUrl, product, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  deleteProduct(productId: number): Observable<IProduct> {
    let options = this.helperService.buildHeaders(RequestMethod.Delete);
    return this.http.delete(this.productUrl + productId, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }
}
