import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: String;
  password!: String;

  constructor(private loginService: LoginService, private router: Router) {

  }

  public login(): void {
    this.loginService.sendDatesLogs(this.username, this.password).subscribe({
      next: () => {
      console.info("Zalogowano poprawnie");
      this.router.navigate(['/courses']);
      },
      error: (err) => {
        console.error("Błąd w logowaniu", err)
      }
  });
    
  }

}
