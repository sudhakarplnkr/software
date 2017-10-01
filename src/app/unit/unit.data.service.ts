import { Injectable } from '@angular/core';
import { Http, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../utils/config.service';
import { IUnit } from '../shared/interfaces';
import { NotificationService } from '../utils/notification.service';
import { HelperService } from '../utils/helper.service';

@Injectable()
export class UnitDataService {
  _baseUnitUrl: string = '';
  constructor(private http: Http,
    private configService: ConfigService,
    private helperService: HelperService,
    private notificationService: NotificationService) {
    this._baseUnitUrl = configService.getApiURI() + 'unit/';
  }

  getUnits(): Observable<IUnit[]> {
    return this.http.get(this._baseUnitUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  createUnit(unit: IUnit): Observable<IUnit> {
    let options = this.helperService.buildHeaders(RequestMethod.Post);

    return this.http.post(this._baseUnitUrl, unit, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  updateUnit(unit: any): Observable<IUnit> {
    let options = this.helperService.buildHeaders(RequestMethod.Put);
    return this.http.put(this._baseUnitUrl, unit, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }

  deleteUnit(unitId: number): Observable<IUnit> {
    let options = this.helperService.buildHeaders(RequestMethod.Delete);
    return this.http.delete(this._baseUnitUrl + unitId, options)
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.notificationService.handleError);
  }
}
