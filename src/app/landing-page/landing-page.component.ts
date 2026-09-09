import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {

  password: string = "";
  error: string = "";
  createRandomUserPending = false;

  constructor(private loginService: LoginService, private router: Router,
    private toastr: ToastrService) {

  }

  public createRandomUser(): void {
    this.createRandomUserPending = true;
    if(this.createRandomUserPending) {
      return;
    }
    this.loginService.createRandomUser().subscribe({
      next: response => {
        this.createRandomUserPending = false;
        this.showSuccess(response.message + ". Witam w wersji demo :)");
        this.router.navigate(["/courses"]);
      },
      error: error => {
        this.createRandomUserPending = false;
        this.error = error.error.message;
        this.password = "";
      },
    })
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

}
