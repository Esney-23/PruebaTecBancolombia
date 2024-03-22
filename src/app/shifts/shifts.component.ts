import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css'],
})
export class ShiftsComponent implements OnInit{
  listUser: any[] = [];

  constructor(private router: Router,//Inyeccion de dependencia para enrutar en componentes
  ) {}

  ngOnInit(): void {
    this.listUserShifts();
  }

  listUserShifts() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('User')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.listUser.push(shiftsLocalStorage[i]);
      }
    }
    // console.log('Asesor:',this.listUser)
    console.log('Categoria alto', this.listUser);
  }

  backMenu() {
    this.router.navigate(['home']); //Asignacion de enrutamiento
  }
}
