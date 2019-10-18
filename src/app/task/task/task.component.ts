import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../domain';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: ITask;
  @Output() emitEdit = new EventEmitter<ITask>();
  @Output() emitDelete = new EventEmitter<ITask>();

  constructor(private taskService$: TaskService) { }

  stopPropgate(ev: Event) {
    ev.stopPropagation();
  }

  toggleTaskStatus(task: ITask) {
    task.completed = !task.completed;
    this.taskService$.update(task).subscribe(
      (updatedTask) => {
        this.task.completed = updatedTask.completed;
      });
  }
  emitEditTask(task: ITask) {
    this.emitEdit.emit(task);
  }
}
