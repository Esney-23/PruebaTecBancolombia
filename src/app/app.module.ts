import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AdviserComponent } from './components/adviser/adviser.component';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './shared/components/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AdviserComponent,
    ShiftsComponent,
    ListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
