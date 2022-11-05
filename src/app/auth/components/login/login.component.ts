import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {ErrorService} from "../../../services/error.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public model: User;
  message: string;
  logForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9_]{1,15}')]),
      password: new FormControl('', Validators.required)
    }
  )

  @ViewChild('loginForm') form: NgForm;

  constructor(private userService: UserService) {
    this.message = "Please log in.";
    this.userService.message.subscribe(flag => this.message = flag);
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.userService.login(this.form.value).subscribe((result: User) => {

        this.userService.authentificateUser(result);
        this.message = "Authentication was completed.";
      }, error => {
        this.message = "Authentication was not completed.";
      }
    );
    this.form.reset();
  }

}
