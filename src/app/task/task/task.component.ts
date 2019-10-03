import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../domain/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task;
  @Output() emitEdit = new EventEmitter<Task>();
  @Output() emitDelete = new EventEmitter<Task>();

  constructor(private taskService$: TaskService) { }

  stopPropgate(ev: Event) {
    ev.stopPropagation();
  }

  toggleTaskStatus(task: Task) {
    task.completed = !task.completed;
    this.taskService$.update(task).subscribe(
      (updatedTask) => {
        this.task.completed = updatedTask.completed;
      });
  }
  emitEditTask(task: Task) {
    this.emitEdit.emit(task);
  }
}
