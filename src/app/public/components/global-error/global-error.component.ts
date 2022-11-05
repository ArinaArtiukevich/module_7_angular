import {Component, OnInit} from "@angular/core";
import {ErrorService} from "../../../services/error.service";

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})
export class GlobalErrorComponent implements OnInit {
  value: string;

  constructor(public errorService: ErrorService) {

  }

  ngOnInit(): void {
    this.errorService.error$.subscribe(value => {
      this.value = value;
    });
  }

  getValue() {
    return this.value;
  }

}
