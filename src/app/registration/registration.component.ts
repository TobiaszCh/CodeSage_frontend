import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = "";
  password: string = "";
  repeatedPassword: string = "";
  response: string = "";
  error: string = "";
  activeLoginButton: boolean = false;
  static ADD_INFO_ABOUT_CORRECT_REGISTRATION: string = ". Proszę przejść do logowania";



  constructor(private registrationService: RegistrationService, private router: Router) {

  }

  public sendRegisterDetails(): void {
    this.registrationService.sendRegisterDetails(this.username.trim(), this.password, this.repeatedPassword).subscribe({
      next: response => {
        this.response = response.message + RegistrationComponent.ADD_INFO_ABOUT_CORRECT_REGISTRATION;
        this.activeLoginButton = true;
        this.error = "";
      },
      error: error => {
        this.error = error.error.message;
        this.response = "";
      }
    })
  }

  public signsMoreThenSevenButLessThenfifteenInPassword(): boolean {
    return 7 < this.password.length && this.password.length < 15;
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

  public goToLogin(): void {
    this.router.navigate(["/login"]);
  }

  public activeRegistration(): boolean {
    return this.signsMoreThenSevenButLessThenfifteenInPassword()
      && this.atLeastOneUpperLetterAndSpecialInPassword()
      && this.lettersWithDashAndFloorInUsername()
      && this.password == this.repeatedPassword;
  }

}
