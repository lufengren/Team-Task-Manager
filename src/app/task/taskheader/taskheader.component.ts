import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-taskheader',
  templateUrl: './taskheader.component.html',
  styleUrls: ['./taskheader.component.css']
})
export class TaskheaderComponent implements OnInit, OnChanges {
  @Input() header;
  @Input() numberOfTasks;
  @Output() newTask = new EventEmitter<void>();
  @Output() moveTaskList = new EventEmitter<void>();
  @Output() editTaskList = new EventEmitter<void>();
  @Output() deleteTaskList = new EventEmitter<void>();
  number: number;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    this.number = this.numberOfTasks;
  }
  openCreateTaskDialog() {
    this.newTask.emit();
  }
  openMoveTaskListDialog() {
    this.moveTaskList.emit();
  }
  openEditTaskListDialog() {
    this.editTaskList.emit();
  }
  openDeleteTaskListDialog() {
    this.deleteTaskList.emit();
  }
}
