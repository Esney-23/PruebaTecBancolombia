import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router'
import { GlobalService } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css'],
})
export class AdviserComponent implements OnInit {
  adviserForm!: FormGroup;
  showBtns = true;
  listUserTurn: any[] = [];
  listUser: any[] = [];
  priorityValidation: any[] = [];
  activeFlag = true;
  countPri = 0;
  showBtnList = true;
  showBtnListR = false;
  title = 'Formulario Asesor';

  constructor(
    private form: FormBuilder,
    private router: Router,
    private globalService: GlobalService
    ) {}

  ngOnInit(): void {
    this.adviserForm = this.form.group({
      nombre: new FormControl('', [Validators.required]),
      idAsesor: new FormControl('', [Validators.required]),
    });
    this.consultTurnUser();
  }

  screenTurns(type: any) {
    this.priorityValidation = [];
    this.listUser.forEach((element) => {
      if (element.tipo === type) {
        this.priorityValidation.push(element);
      }
    });
  }

  consultTurnUser() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('userTurn')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.listUserTurn.push(shiftsLocalStorage[i]);
      }
    }
  }

  addTurnUser(user: any) {
    this.modifyUser(user);
    const arr = {
      nombre: user.nombre,
      cedula: user.cedula,
      tipo: user.tipo,
      idAsesor: this.adviserForm.get('idAsesor')?.value,
      idLlamada: '1',
      estadoTurno: 'Activo'
    };
    this.listUserTurn.push(arr);
    localStorage.setItem('userTurn', JSON.stringify(this.listUserTurn));
    this.router.navigate(['home']);
  }

  modifyUser(user: any) {
    user.atendido = 'Si';
    localStorage.setItem('User', JSON.stringify(this.listUser));
  }

  showShifts() {
    this.title = 'Asignar Turno'
    this.showBtns = !this.showBtns;
    this.validationOrderTurns();
    this.validate();
  }

  validationOrderTurns() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('User')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.validateUsersServed(shiftsLocalStorage, i);
      }
    }
    this.countPri > 0 ? (this.activeFlag = false) : (this.activeFlag = true);
  }

  validateUsersServed(shiftsLocalStorage: any, iterator: any) {
    if (shiftsLocalStorage[iterator].atendido === 'NO') {
      this.listUser.push(shiftsLocalStorage[iterator]);
    }
    if (shiftsLocalStorage[iterator].tipo === 'alto' && shiftsLocalStorage[iterator].atendido === 'NO') {
      this.priorityValidation.push(shiftsLocalStorage[iterator]);
      this.countPri++;
    }
  }

  validate() {
    this.listUserTurn.forEach((element) => {
      if (element.idAsesor === this.adviserForm.get('idAsesor')?.value) {
        if (element.estadoTurno === 'Activo' || element.estadoTurno === 'Reintentar') {
          this.showBtnList = false;
          this.showBtnListR = true;
          this.priorityValidation = [];
          this.priorityValidation.push(element);
        }
      }
    });
  }

  chageStatus(item: any) {
    switch (item.option) {
      case 'Reintentar':
        let idCalled = Number(item.user.idLlamada) + 1;
        item.user.idLlamada = idCalled.toString();
        localStorage.setItem('userTurn', JSON.stringify(this.listUserTurn));
        break;
      case 'Terminado':
        item.user.estadoTurno = 'Terminado';
        localStorage.setItem('userTurn', JSON.stringify(this.listUserTurn));
        break;
      case 'Rechazado':
        item.user.estadoTurno = 'Rechazado';
        localStorage.setItem('userTurn', JSON.stringify(this.listUserTurn));
        break;
    }
  }
  backMenu() {
    this.globalService.backMenu();
  }
}
