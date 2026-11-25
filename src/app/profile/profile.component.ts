import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username = '';
  roleLabel = 'Brak danych';
  createdAt: string | null = null;
  isLoadingProfile = true;
  activeSection = 'profile';
  emailNotifications = true;

  constructor(private navbarService: NavbarService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.navbarService.getUserProfile().subscribe({
      next: (profile) => {
        this.username = profile.username;
        this.roleLabel = this.getRoleLabel(profile.role);
        this.createdAt = profile.createdAt || null;
        this.isLoadingProfile = false;
      },
      error: () => this.isLoadingProfile = false
    });
  }

  private getRoleLabel(role?: string): string {
    switch (role) {
      case 'DEMO':
        return 'Wersja demo';
      case 'USER':
        return 'Użytkownik';
      case 'ADMIN':
        return 'Administrator';
      default:
        return 'Brak danych';
    }
  }

  selectSection(section: string): void {
    this.activeSection = section;
  }

  saveChanges(): void {
    this.toastr.success('Ustawienia zostały zapisane.', 'Sukces!');
  }
}
