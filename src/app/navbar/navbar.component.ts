import { Component } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: String = ""

  constructor(private navbarService: NavbarService) {

  }
  
  ngOnInit(): void {
    this.navbarService.getUserName().subscribe({
      next: (result) => {
      this.username = result.username;
      console.info("fsf");
      },
      error: () => {
        this.username = ""
      }
    });
  }

}
