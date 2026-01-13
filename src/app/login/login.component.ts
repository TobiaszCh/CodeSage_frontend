import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth-guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  error: string = "";
  hide: boolean = true;

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService
    , private authService: AuthService) {

  }

  public login(): void {
    this.loginService.sendDatesLogs(this.username, this.password).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.error = error.error.message;
        this.password = "";
      },
    }); 
  }

  public loginByGoogle() {
    this.loginService.loginByGoogle();
  }

  public goToRegistration(): void {
    this.router.navigate(["/register"]);
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public showPassword() {
    this.hide = !this.hide;
  }
}
