import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css'],
})
export class ShiftsComponent implements OnInit {
  listUser: any[] = [];

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.listUserShifts();
  }

  listUserShifts() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('userTurn')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        if (shiftsLocalStorage[i].estadoTurno === 'Activo') {
          this.listUser.push(shiftsLocalStorage[i]);
        }
      }
    }
  }

  backMenu() {
    this.globalService.backMenu();
  }
}
