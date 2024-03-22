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
  exampleForm!: FormGroup;
  showBtns = true;
  listUser: any[] = [];

  constructor(private form: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.exampleForm = this.form.group({
      nombre: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
    });
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
    // console.log('Asesor:',this.listUser)
    console.log('Categoria alto', this.listUser)
  }

  showShifts() {
    this.showBtns = !this.showBtns;
  }
}
  