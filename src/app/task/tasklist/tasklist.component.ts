import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITasklist } from '../../domain';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent {
  @Input() list: ITasklist;
  @Output() emitId = new EventEmitter<string>();
  @Output() emitEditList = new EventEmitter<ITasklist>();
  @Output() emitDeleteList = new EventEmitter<ITasklist>();

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
