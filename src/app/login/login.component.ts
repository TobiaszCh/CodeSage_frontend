import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  error: string = ""

  constructor(private loginService: LoginService, private router: Router) {

  }

  public login(): void {
    this.loginService.sendDatesLogs(this.username, this.password).subscribe({
      next: (response) => {
        console.info(response.message);
        this.router.navigate(['/courses']);
      },
      error: (error) => {
        this.error = "";
        this.error = error.error.message;
      }
    });

  }

  public goToRegistration(): void {
    this.router.navigate(["/register"]);
  }

}
