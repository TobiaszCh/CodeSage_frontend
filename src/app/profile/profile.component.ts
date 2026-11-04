import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email = '';
  isLoadingProfile = true;
  activeSection = 'profile';
  emailNotifications = true;

  private readonly notificationStorageKey = 'code-sage-email-notifications';

  constructor(
    private navbarService: NavbarService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.navbarService.getUserName().subscribe({
      next: ({ username }) => {
        this.email = username;
        this.isLoadingProfile = false;
      },
      error: () => this.isLoadingProfile = false
    });

    this.emailNotifications = localStorage.getItem(this.notificationStorageKey) !== 'false';
  }

  selectSection(section: string): void {
    this.activeSection = section;
  }

  saveChanges(): void {
    localStorage.setItem(this.notificationStorageKey, String(this.emailNotifications));
    this.toastr.success('Ustawienia zostały zapisane.', 'Sukces!');
  }
}
