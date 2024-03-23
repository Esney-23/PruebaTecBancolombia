import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  exampleForm!: FormGroup;
  showBtns = true;
  iteratorarray: any[] = [];
  title = 'Formulario Usuario';

  constructor(
    private form: FormBuilder,
    private router: Router, 
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.exampleForm = this.form.group({
      nombre: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.consultShifts();
  }

  consultShifts() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('User')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.iteratorarray.push(shiftsLocalStorage[i]);
      }
    }
  }

  addUser(type: any) {
    alert(type + 'Se ha generado su turno');
    const arr = {
      tipo: type,
      nombre: this.exampleForm.get('nombre')?.value,
      cedula: this.exampleForm.get('cedula')?.value,
      atendido: 'No',
    };
    this.iteratorarray.push(arr);
    localStorage.setItem('User', JSON.stringify(this.iteratorarray));
    this.router.navigate(['home']); 
  }

  showShifts() {
    this.title = 'Seleccionar Turno'
    this.showBtns = !this.showBtns;
  }

  backMenu() {
    this.globalService.backMenu();
  }
}
