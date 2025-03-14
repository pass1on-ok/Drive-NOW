import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FleetComponent } from './pages/fleet/fleet.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'fleet', component: FleetComponent }
];
