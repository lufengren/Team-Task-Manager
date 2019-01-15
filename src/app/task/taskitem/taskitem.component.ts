import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css']
})
export class TaskitemComponent implements OnInit, OnChanges {
  @Input() listId;
  @Input() newTask;
  @Input() updatedTask;
  @Output() editTask = new EventEmitter();
  @Output() taskStatus = new EventEmitter();
  @Output() numberOfTasks = new EventEmitter();
  tasks;
  isCompleted: boolean;
  constructor(private service$: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }
  ngOnChanges() {
    this.getTasks();
  }
  getTasks() {
    this.service$.getByListId(this.listId).subscribe(tasks => {
      this.tasks = tasks.reverse();
      this.numberOfTasks.emit(this.tasks.length);
    });
  }
  onClick(task) {
    this.editTask.emit(task);
  }
  toggleTaskStatus(task) {
    this.taskStatus.emit(task);
  }
  onClickCheckbox(ev: Event) {
    ev.stopPropagation();
  }

}
