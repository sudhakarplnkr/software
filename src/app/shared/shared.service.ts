import { Injectable } from '@angular/core'

@Injectable()
export class SharedService {
    pendingRequests: number = 0;
}