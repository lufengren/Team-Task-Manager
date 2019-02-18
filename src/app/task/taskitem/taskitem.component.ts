import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css']
})
export class TaskitemComponent implements OnInit, OnChanges {

  @Input() lists;
  @Input() updateTask;
  @Output() emitAddEvent = new EventEmitter<void>();
  @Output() emitEditEvent = new EventEmitter<void>();
  @Output() taskStatus = new EventEmitter();
  allTasks;
  tasks;
  childId;
  parentId;
  isCompleted: boolean;
  searchTerm: FormControl = new FormControl();

  routeParam;
  constructor(
    private service$: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchTerm.valueChanges
      .subscribe(term => {
        if (!term.trim()) {
          this.tasks = this.allTasks;
        } else {
          this.tasks = this.allTasks.filter(task => task.desc.includes(term));
        }
        if (this.childId !== this.parentId) {
          this.router.navigate(['/projects', this.parentId, 'tasklists']);
        }
      });
  }

  ngOnChanges() {
    if (this.lists) {
      this.activatedRoute.firstChild.paramMap.subscribe(childrenParams => {
        this.childId = childrenParams.get('id');
        this.activatedRoute.paramMap.subscribe(parentParams => {
          this.parentId = parentParams.get('id');
          if (this.childId === this.parentId) {
            this.getAllTasks(this.lists);
          } else {
            this.getAllTasks(this.lists);
            this.getTasks(this.childId);
          }
        });
      });
    }
  }

  getAllTasks(lists) {
    let res = [];
    const listIds = lists.map(list => list = list.id);
    listIds.forEach(listId => this.service$.getByListId(listId).subscribe(
      tasks => {
        res = [...res, ...tasks];
        this.allTasks = res;
        this.tasks = res.reverse();
      }
    ));
  }

  getTasks(taskListId) {
    this.service$.getByListId(taskListId).subscribe(tasks => {
      this.tasks = tasks.reverse();
    });
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
