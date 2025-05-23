import { Component } from '@angular/core';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = "";
  password: string = "";
  passwordRepeat!: string;

  constructor(private registrationService: RegistrationService) {

  }

  public signsMoreThenSevenButLessThenfifteenInPassword(): boolean {
    return 7 < this.password.length && this.password.length < 15;
  }

  public atLeastOneUpperLetterAndSpecialInPassword(): boolean {
    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasSpecialChar = /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]/.test(this.password);
    return hasUpperCase && hasSpecialChar;
  }
  public onlyLettersInUsername(): boolean {
    const letters = /^[A-Za-z]+$/.test(this.username);
    return letters;
  }

  public activeRegistration(): boolean {
    return this.signsMoreThenSevenButLessThenfifteenInPassword()
    && this.atLeastOneUpperLetterAndSpecialInPassword()
    && this.onlyLettersInUsername()
    && this.password == this.passwordRepeat;
  }

  public sendRegisterDetails(): void {
    this.registrationService.sendRegisterDetails(this.username, this.password, this.passwordRepeat).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })

  }






}
