// import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
// import {User} from "../../models/user";
// import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
// import {UserService} from "../../services/user.service";
//
// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.scss'], encapsulation: ViewEncapsulation.None
// })
// export class SignupComponent implements OnInit {
//   public model: User;
//   message: string;
//   signupFormGroup = new FormGroup({
//       login: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9_]{1,15}')]),
//       budget: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,10}')]),
//
//       password: new FormControl('', Validators.required)
//     }
//   )
//
//   validPassword = false;
//   ACCESS_TOKEN = "access_token";
//   ID = "id";
//   ROLE = "role";
//
//   @ViewChild('signupForm') form: NgForm;
//
//   constructor(private userService: UserService) {
//     this.message = "Please sign up.";
//     this.userService.message.subscribe(flag => this.message = flag);
//   }
//
//   ngOnInit(): void {
//   }
//
//   checkPasswords() {
//     this.validPassword = this.form.value.password === (<HTMLInputElement>document.getElementById('repeat_password')).value;
//   }
//
//   signupUser() {
//     this.userService.signup(this.form.value).subscribe((result: User) => {
//        this.userService.authentificateUser(result);
//         this.message = "Registration was completed.";
//       }, error => {
//         this.message = "Registration was not completed.";
//       }
//     );
//     this.form.reset();
//     (<HTMLInputElement>document.getElementById('repeat_password')).value = "";
//   }
// }
