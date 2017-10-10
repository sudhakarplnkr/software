import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../shared/shared.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare var $: any;

@Injectable()
export class ExtendedHttpService extends Http {
  public pendingRequests: number = 0;
  public showLoading: boolean = false;
  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private sharedService: SharedService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  intercept(observable: any): Observable<Response> {
    var timer = Observable.timer(0);
    timer.subscribe(t => {
      this.sharedService.pendingRequests++;
    });
    return observable
      .catch((err, source) => {
        console.log("Caught error: " + err);
      })
      .do((res: Response) => {
      }, (err: any) => {
      })
      .finally(() => {
        this.sharedService.pendingRequests--;
      });
  }
}