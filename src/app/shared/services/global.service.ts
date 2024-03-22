import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private iteratorarray: string[] = [];

  constructor() { }

  consultShifts() {
    let shiftsLocalStorage = JSON.parse(localStorage.getItem('User')!);
    if (shiftsLocalStorage) {
      for (let i = 0; i < shiftsLocalStorage.length; i++) {
        this.iteratorarray.push(shiftsLocalStorage[i]);
      }
    }
    return this.iteratorarray;
  }
}
