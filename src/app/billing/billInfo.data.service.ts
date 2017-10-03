import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../utils/config.service';
import { IBillInfo } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { HelperService } from '../utils/helper.service';

@Injectable()
export class BillInfoDataService {
  _basebillInfoUrl: string = '';
  constructor(private http: Http,
    private configService: ConfigService,
    private helperService: HelperService,
    private notificationService: NotificationService) {
    this._basebillInfoUrl = configService.getApiURI() + 'billinfo/';
  }

  getBillInfo(): Observable<IBillInfo[]> {
    return this.http.get(this._basebillInfoUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  getBillInfoById(billId: number): Observable<IBillInfo> {
    return this.http.get(this._basebillInfoUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  createBillInfo(billInfo: IBillInfo): Observable<IBillInfo> {
    let options = this.helperService.buildHeaders(RequestMethod.Post);
    return this.http.post(this._basebillInfoUrl, billInfo, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  updateBillInfo(billInfo: any): Observable<IBillInfo> {
    let options = this.helperService.buildHeaders(RequestMethod.Put);
    return this.http.put(this._basebillInfoUrl, billInfo, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  deleteBillInfo(billInfoId: number): Observable<IBillInfo> {
    let options = this.helperService.buildHeaders(RequestMethod.Delete);
    return this.http.delete(this._basebillInfoUrl + billInfoId, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }
}
