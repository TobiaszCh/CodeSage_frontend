import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  error: string = "";

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) {

  }

  public login(): void {
    this.loginService.sendDatesLogs(this.username, this.password).subscribe({
      next: (response) => {
        this.showSuccess(response.message);
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.error = error.error.message;
      },
    }); 
  }

  public goToRegistration(): void {
    this.router.navigate(["/register"]);
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

}
