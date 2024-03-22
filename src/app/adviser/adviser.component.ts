import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private form: FormBuilder, private router: Router) {}

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
    const arr = {
      nombre: user.nombre,
      cedula: user.cedula,
      idAsesor: this.adviserForm.get('idAsesor')?.value,
    };
    this.listUserTurn.push(arr);
    localStorage.setItem('userTurn', JSON.stringify(this.listUserTurn)); //Se llama el array y se convierte a String
    this.router.navigate(['home']); //Asignacion de enrutamiento
  }

  showShifts() {
    this.showBtns = !this.showBtns;
    this.validationOrderTurns();
    this.validate();
  }

  validationOrderTurns() {
    //Valida si hay turnos prioritarios para inhabilitar el resto de turnos
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('User')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.listUser.push(shiftsLocalStorage[i]);
        if (shiftsLocalStorage[i].tipo === 'alto') {
          this.priorityValidation.push(shiftsLocalStorage[i]);
          this.countPri++;
        }
      }
    }
    this.countPri > 0 ? (this.activeFlag = false) : (this.activeFlag = true);
    console.log(this.countPri);
  }

  validate() {
    this.listUserTurn.forEach((element) => {
      if (element.idAsesor === this.adviserForm.get('idAsesor')?.value) {
        this.priorityValidation = [];
        this.priorityValidation.push(element);
        console.log('validacion',element.idAsesor, this.adviserForm.get('idAsesor')?.value)
      }
    });
  }
}
