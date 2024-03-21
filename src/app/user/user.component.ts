import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  exampleForm!: FormGroup;
  showBtns = true;
  iteratorarray: any[] = []; //Variables globales

  constructor(
    private form: FormBuilder,
    private router: Router //Inyeccion de dependencia para enrutar en componentes
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
    let shiftsLocalStorage = localStorage.getItem('User');

    if (shiftsLocalStorage) {
      console.log('Si existe', shiftsLocalStorage);
      let parsedBody = JSON.parse(shiftsLocalStorage);
      console.warn('data nueva', parsedBody);

      for (let i = 0; i < parsedBody.length; i++) {
        console.log('Iteracion Array', parsedBody[i]);
        this.iteratorarray.push(parsedBody[i]);
      }
    }
  }

  agregarUsuarios(type: any) {
    alert(type + 'Se ha generado su turno');

    type UserArray = Array<{ id: number; text: string }>;

    const arr = [
      {
        tipo: type,
        nombre: this.exampleForm.get('nombre')?.value,
        cedula: this.exampleForm.get('cedula')?.value,
      },
    ];
    this.iteratorarray.push(arr);
    localStorage.setItem('User', JSON.stringify(this.iteratorarray)); //Se llama el array y se convierte a String
    this.router.navigate(['home']); //Asignacion de enrutamiento
  }

  showShifts() {
    this.showBtns = !this.showBtns;
  }
}
