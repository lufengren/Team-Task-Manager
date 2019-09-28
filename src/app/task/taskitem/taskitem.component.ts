import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Task } from '../../domain/task.model';

@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css']
})
export class TaskitemComponent implements OnInit, OnChanges {
  @Input() tasks: Task[];
  @Output() emitAddEvent = new EventEmitter<void>();
  @Output() emitEditEvent = new EventEmitter<void>();
  @Output() taskStatus = new EventEmitter();
  allTasks: Task[];
  currentTasks: Task[];
  searchTerm: FormControl = new FormControl();

  constructor(
    private router: Router
  ) { }

  ngOnChanges() {
    this.allTasks = this.tasks;
    this.currentTasks = this.tasks;
  }
  ngOnInit() {
    this.searchTerm.valueChanges
      .subscribe(term => {
        if (term.trim()) {
          this.tasks = this.allTasks.filter(task => task.desc.includes(term));
        } else {
          this.tasks = this.currentTasks;
        }
      });
  }
  showAllTasks() {
    this.tasks = this.allTasks;
    this.currentTasks = this.tasks;
  }
  filterTasksByTasklistId(tasklistId) {
    this.tasks = this.allTasks.filter((item) => {
      return item.taskListId === tasklistId;
    });
    this.currentTasks = this.tasks;
  }

  emitAddClick() {
    this.emitAddEvent.emit();
  }
  emitEditClick(task) {
    this.emitEditEvent.emit(task);
  }

  toggleTaskStatus(task) {
    this.taskStatus.emit(task);
  }
  onClickCheckbox(ev: Event) {
    ev.stopPropagation();
  }

  backToProjects() {
    this.router.navigate(['/projects']);
  }

}
