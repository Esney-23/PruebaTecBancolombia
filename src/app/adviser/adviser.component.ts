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

  constructor(private form: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.adviserForm = this.form.group({
      nombre: new FormControl('', [Validators.required]),
      idAsesor: new FormControl('', [Validators.required]),
    });
    this.consultTurnUser();
  }

  screenTurns (type: any){
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('User')!);
    this.listUser =[];
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        if (shiftsLocalStorage[i].tipo === type) {
          this.listUser.push(shiftsLocalStorage[i]);
        }
      }
    }
    // console.log('Asesor:',this.listUserTurn)
    console.log('Categoria alto', this.listUserTurn)
  }

  consultTurnUser() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('userTurn')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.listUserTurn.push(shiftsLocalStorage[i]);
      }
    }
  }

  addTurnUser(user:any) {
    const arr = {
        nombre: user.nombre,
        cedula: user.cedula,
        idAsesor: this.adviserForm.get('idAsesor')?.value,
    }
    this.listUserTurn.push(arr);
    localStorage.setItem('userTurn', JSON.stringify(this.listUserTurn)); //Se llama el array y se convierte a String
    this.router.navigate(['home']); //Asignacion de enrutamiento

  }

  showShifts() {
    this.showBtns = !this.showBtns;
    this.prueba();
  }

  prueba() {
    console.log('prueba')
  }
}
  