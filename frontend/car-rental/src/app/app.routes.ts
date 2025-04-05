import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { FleetDetailsComponent } from './pages/fleet-details/fleet-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'fleet', component: FleetComponent },
  { path: 'fleet/:id', component: FleetDetailsComponent },
];
