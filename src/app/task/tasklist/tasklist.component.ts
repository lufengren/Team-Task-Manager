import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tasklist } from '../../domain/tasklist.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  @Input() list: Tasklist[];
  @Output() emitId = new EventEmitter<string>();
  @Output() emitEditList = new EventEmitter<Tasklist>();
  @Output() emitDeleteList = new EventEmitter<Tasklist>();

  constructor() { }

  emitTasklistId(id) {
    this.emitId.emit(id);
  }
  emitEditEvent(list) {
    this.emitEditList.emit(list);
  }
  emitDeleteEvent(list) {
    this.emitDeleteList.emit(list);
  }
}
