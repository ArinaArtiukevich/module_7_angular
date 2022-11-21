import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShareNavBarRequestService {
  tagName: Subject<string>;
  certificateName: Subject<string>;

  private subject = new Subject<any>();

  constructor() {
    this.tagName = new Subject<string>();
    this.certificateName = new Subject<string>();
  }

  sendClientEvent() {
    this.subject.next({});
  }

  getClientEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
