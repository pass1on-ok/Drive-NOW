import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { FleetDetailsComponent } from './pages/fleet-details/fleet-details.component';
import { AdsComponent } from './pages/ads/ads.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from './app.component';
import { BookingComponent } from './pages/booking/booking.component';
import { Component } from '@angular/core';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MyPaymentsComponent } from './pages/my-payments/my-payments.component';
import { FleetDashboardComponent } from './pages/fleet-dashboard/fleet-dashboard.component';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';
import { CardPaymentComponent } from './pages/payment/card-payment.component';
import { BankTransferPaymentComponent } from './pages/payment/bank-transfer-payment.component';
import { EditVehicleComponent } from './pages/fleet-details/edit-vehicle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'fleet', component: FleetComponent },
  { path: 'fleet/:id', component: FleetDetailsComponent },
  { path: 'ads', component: AdsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent},
  { path: 'my-bookings', component: MyBookingsComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'my-payments', component: MyPaymentsComponent},
  { path: 'fleet-manager/dashboard', component: FleetDashboardComponent},
  { path: 'add-vehicle', component: AddVehicleComponent},
  { path: 'card-payment', component: CardPaymentComponent},
  { path: 'bank-transfer-payment', component: BankTransferPaymentComponent},
  { path: 'fleet/edit/:id', component: EditVehicleComponent },
  { path: '**', redirectTo: '' }
];
