import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class HelperService {
    buildHeaders(requestMethod: RequestMethod): RequestOptions {
        let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
        let options = new RequestOptions({ method: requestMethod, headers: headers });
        return options;
    }
}