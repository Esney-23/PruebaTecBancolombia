import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AdviserComponent } from './components/adviser/adviser.component';
import { ShiftsComponent } from './components/shifts/shifts.component';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "home" },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'adviser', component: AdviserComponent },
  { path: 'shifts', component: ShiftsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
