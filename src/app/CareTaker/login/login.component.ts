import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any[] = []; // Assuming your user data structure
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService, // Adjust user name
    private router: Router
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    // this.loginService.getlogin().subscribe(
    //   (data: any) => {
    //     this.users = data;
    //   }
    // );
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      const enteredEmail = this.emailControl?.value;
      const enteredPassword = this.passwordControl?.value;

      const user = this.users.find(u => u.email === enteredEmail && u.password === enteredPassword);

      if (user) {
        this.handleSuccessfulLogin();
      } else {
        this.handleFailedLogin();
      }
    }
  }

  private handleSuccessfulLogin() {
    this.router.navigate(['/Dashboard/Home']);
  }

  private handleFailedLogin() {
    this.loginError = true;
  }
}
