import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() contentArray: any[] = [];
  @Input() showBtnR = false;
  @Input() showBtn = true;
  @Input() showIdAsesor = false;
  @Output() emitUserInfo = new EventEmitter<{}>();
  @Output() reintentar = new EventEmitter<{}>();

  setUserInfo(type: {}) {
    this.emitUserInfo.emit(type);
  }

  retry(user: {}, option: string) {
    let emitUserInfo = {
      user,
      option
    }
    this.reintentar.emit(emitUserInfo);
  }
}
