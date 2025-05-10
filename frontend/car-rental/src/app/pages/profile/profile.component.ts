import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  profileForm!: FormGroup;
  isEditing = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    this.authService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data;
        this.profileForm = this.fb.group({
          username: [{ value: this.userProfile.username, disabled: true }],
          email: [{ value: this.userProfile.email, disabled: true }],
          name: [{value: this.userProfile.name, disabled: true}],
          phoneNumber: [{value: this.userProfile.phoneNumber, disabled: true}],
          address: [this.userProfile.address],
          userType: [{ value: this.userProfile.userType, disabled: true }]
        });
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }
  enableEditing() {
    this.isEditing = true;
    this.profileForm.get('name')?.enable();
    this.profileForm.get('phoneNumber')?.enable();
    this.profileForm.get('address')?.enable();
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const updatedData = this.profileForm.getRawValue();

    this.authService.updateProfile(updatedData).subscribe(
      () => {
        alert('Профиль обновлён');
        this.isEditing = false; 
        this.profileForm.get('name')?.disable();
        this.profileForm.get('phoneNumber')?.disable();
        this.profileForm.get('address')?.disable();
      },
      () => alert('Ошибка при обновлении профиля')
    );
  }


  goToBookings() {
    this.router.navigate(['/my-bookings']);
  }
  goToPayments() {
    this.router.navigate(['/my-payments']);
  }

  goToAddCar() {
  this.router.navigate(['/add-vehicle']);
}

  goToDashboard() {
  this.router.navigate(['/fleet-manager/dashboard']);
}
}
