import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../utils/config.service';
import { ICompany } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { HelperService } from '../utils/helper.service';

@Injectable()
export class CompanyDataService {
  _baseUnitUrl: string = '';
  headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
  constructor(private http: Http,
    private configService: ConfigService,
    private helperService: HelperService,
    private notificationService: NotificationService) {
    this._baseUnitUrl = configService.getApiURI() + 'company/';
  }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get(this._baseUnitUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  createCompany(unit: ICompany): Observable<ICompany> {
    let options = this.helperService.buildHeaders(RequestMethod.Post);

    return this.http.post(this._baseUnitUrl, unit, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  updateCompany(unit: any): Observable<ICompany> {
    let options = this.helperService.buildHeaders(RequestMethod.Put);
    return this.http.put(this._baseUnitUrl, unit, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  deleteCompany(unitId: number): Observable<ICompany> {
    let options = this.helperService.buildHeaders(RequestMethod.Delete);
    return this.http.delete(this._baseUnitUrl + unitId, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }
}
