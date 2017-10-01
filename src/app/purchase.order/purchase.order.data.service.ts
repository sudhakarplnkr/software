import { Injectable } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../utils/config.service';
import { HelperService } from '../utils/helper.service';
import { NotificationService } from '../utils/notification.service';
import { IPurchaseOrder } from '../shared/interfaces';

@Injectable()
export class PurchaseOrderDataService {
  private purchaseOrderUrl: string = '';
  constructor(private http: Http,
    private configService: ConfigService,
    private helperService: HelperService,
    private notificationService: NotificationService) {
    this.purchaseOrderUrl = configService.getApiURI() + 'purchaseOrder/';
  }

  getPurchaseOrders(): Observable<IPurchaseOrder[]> {
    return this.http.get(this.purchaseOrderUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  createPurchaseOrder(purchaseOrder: IPurchaseOrder): Observable<IPurchaseOrder> {
    let options = this.helperService.buildHeaders(RequestMethod.Post);

    return this.http.post(this.purchaseOrderUrl, purchaseOrder, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  updatePurchaseOrder(purchaseOrder: IPurchaseOrder): Observable<IPurchaseOrder> {
    let options = this.helperService.buildHeaders(RequestMethod.Put);
    return this.http.put(this.purchaseOrderUrl, purchaseOrder, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  deletePurchaseOrder(purchaseOrderId: number): Observable<IPurchaseOrder> {
    let options = this.helperService.buildHeaders(RequestMethod.Delete);
    return this.http.delete(this.purchaseOrderUrl + purchaseOrderId, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }
}
