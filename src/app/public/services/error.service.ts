import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new Subject<string>();

  constructor(private router: Router) {
  }

  handle(message: string) {
    this.router.navigate(['/error']);
    this.error$.next(message);
  }

  clear() {
    this.error$.next('');
  }
}
