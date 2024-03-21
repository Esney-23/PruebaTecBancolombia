import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-adviser',
  templateUrl: './adviser.component.html',
  styleUrls: ['./adviser.component.css'],
})
export class AdviserComponent implements OnInit {
  formularioEjemplo: FormGroup;

  constructor(private form: FormBuilder) {
    this.formularioEjemplo = form.group({
      nombre: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required, Validators.min(10)]),
    });
  }

  ngOnInit(): void {}

  agregarUsuarios(type: 'alto' | 'medio' | 'bajo') {
    alert(type + 'Se ha generado su turno');
  }
}
