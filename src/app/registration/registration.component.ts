import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = "";
  password: string = "";
  repeatedPassword: string = "";
  error: string = "";

  constructor(private registrationService: RegistrationService, private router: Router, private loginService: LoginService,
    private toastr: ToastrService) {
      
  }

  public sendRegisterDetails(): void {
    this.registrationService.sendRegisterDetails(this.username.trim(), this.password, this.repeatedPassword).subscribe({
      next: response => {
        const messageToToastr = response.message;
        this.showSuccess(messageToToastr);
        this.loginService.sendDatesLogs(this.username, this.password).subscribe({
          next: () => {
            this.router.navigate(["/courses"]);
          },
          error: (error) => {
            this.error = error.error.message;
          }
        });
      },
      error: error => {
        this.error = error.error.message;
        this.password = "";
      },
    })
  }

  public signsMoreThenSevenButLessThenfifteenInPassword(): boolean {
    return 7 < this.password.length && this.password.length <= 100;
  }

  public atLeastOneUpperLetterAndSpecialInPassword(): boolean {
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasSpecialChar = /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]/.test(this.password);
    return hasUpperCase && hasSpecialChar;
  }

  public lettersWithDashAndFloorInUsername(): boolean {
    const letters = /^[0-9A-Za-z_-]+$/.test(this.username);
    return letters;
  }

  public activeRegistration(): boolean {
    return this.signsMoreThenSevenButLessThenfifteenInPassword()
      && this.atLeastOneUpperLetterAndSpecialInPassword()
      && this.lettersWithDashAndFloorInUsername()
      && this.password == this.repeatedPassword;
  }
  
  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

  public goToLogin(): void {
    this.router.navigate(["/login"]);
  }

}
