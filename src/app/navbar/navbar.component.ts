import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: String = ""

  constructor(private navbarService: NavbarService, private router: Router, private toastr: ToastrService) {

  }
  
  ngOnInit(): void {
    this.navbarService.getUserName().subscribe({
      next: (result) => {
      this.username = result.username;
      },
      error: () => {
        this.username = ""
      }
    });
  }

  public logout(): void {
    this.navbarService.logout().subscribe({
      next: response => {
        this.showSuccess(response.message);
        this.router.navigate(["/login"]);
      
      },
      error: error => {
        console.log(error.error.message);
      }
    })
  }

  public showSuccess(messageToToastr: string) {
    this.toastr.success(messageToToastr, "Sukces!");
  }

}
