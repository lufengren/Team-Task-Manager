import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CreatetaskComponent } from '../createtask/createtask.component';
import { CreatetasklistComponent } from '../createtasklist/createtasklist.component';
import { DeleteDialogComponent } from '../../share/delete-dialog/delete-dialog.component';

import { TasklistService } from '../../service/tasklist.service';
import { TaskService } from '../../service/task.service';
import { ProjectService } from '../../service/project.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Tasklist } from '../../domain/tasklist.model';
import { Task } from '../../domain/task.model';
import { Project } from '../../domain/project.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-taskhome',
  templateUrl: './taskhome.component.html',
  styleUrls: ['./taskhome.component.css']
})
export class TaskhomeComponent implements OnInit {
  allLists: Tasklist[];
  allTasks: Task[];
  tasks: Task[];
  currentTasks: Task[];
  projectId: string;
  currentProject: Project;
  currentTasklistId: string;

  isHidden = false;
  @Output() activeTaskItem = new EventEmitter();
  searchTerm: FormControl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private tasklistService$: TasklistService,
    private taskService$: TaskService,
    private projectService$: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.pipe(
    //   switchMap(
    //     params => {
    //       this.projectId = params.get('id');
    //       return this.tasklistService$.getByProjectId(this.projectId);
    //     })
    // ).subscribe(tasklists => this.lists = tasklists.reverse());
    // this.projectService$.get().subscribe();

    this.searchTerm.valueChanges
      .subscribe(term => {
        if (term.trim()) {
          this.tasks = this.currentTasks.filter(task => task.desc.includes(term));
        } else {
          this.tasks = this.currentTasks;
        }
      });

    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProjectInfo(this.projectId);
    this.getTasklistsByProjectId(this.projectId);
    this.getTasksByProjectId(this.projectId);
  }
  getProjectInfo(id) {
    this.projectService$.getById(id).subscribe(project => this.currentProject = project);
  }
  getTasklistsByProjectId(id) {
    this.tasklistService$.getByProjectId(id).subscribe(tasklists => {
      this.allLists = tasklists.reverse();
    });
  }
  getTasksByProjectId(id) {
    this.taskService$.getByProjectId(id).subscribe((tasks) => {
      this.allTasks = tasks;
      this.tasks = tasks;
      this.currentTasks = tasks;
    });
  }

  getTasksByTasklistId(id) {
    this.currentTasklistId = id;
    this.tasks = this.allTasks.filter((task) => {
      return task.taskListId === id;
    });
  }
  showAllTasks() {
    this.currentTasklistId = null;
    this.tasks = this.allTasks;
  }

  // eventhandlers for opetate task list(create/edit/delete)
  openCreateTaskListDialog() {
    const dialogRef = this.dialog.open(CreatetasklistComponent, { data: { title: 'Add Tasklist' } });
    dialogRef.afterClosed().subscribe(name => {
      if (name !== '') {
        const taskListInfo = {
          name: name,
          projectId: this.projectId,
        };
        this.tasklistService$.add(taskListInfo).subscribe(taskList => {
          this.allLists = [taskList, ...this.allLists];
          this.router.navigate(['/projects', this.projectId, 'tasklists', 'tasks', parseInt(taskList.id, 10)]);
        });
      }
    });
  }
  openEditTaskListDialog(list) {
    const dialogRef = this.dialog.open(CreatetasklistComponent, { data: { tasklist: list, title: 'Edit Tasklist' } });
    dialogRef.afterClosed().subscribe(
      updatedname => {
        if (updatedname) {
          this.tasklistService$.update({ name: updatedname }, list.id, this.projectId).subscribe(
            (updatedTasklist) => {
              const index = this.allLists.map(item => item.id).indexOf(updatedTasklist.id);
              this.allLists = [...this.allLists.slice(0, index), updatedTasklist, ...this.allLists.slice(index + 1)];
            }
          );
        }
      });
  }
  openDeleteTaskListDialog(list) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Tasklist',
        content: `Delete ${list.name} will delete all tasks under it`
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'true') {
        this.tasklistService$.delete(list.id).subscribe(
          () => {
            this.allLists = this.allLists.filter(item => item.id !== list.id);
            this.router.navigate(['/projects', this.projectId, 'tasklists', 'tasks']);
            this.getTasksByProjectId(this.projectId);
          }
        );
      }
    });
  }
  // eventhandlers for opetate task (create/edit/delete)
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreatetaskComponent, { data: { tasklists: this.allLists } });
    dialogRef.afterClosed().subscribe(taskInfo => {
      if (taskInfo) {
        this.taskService$.add(taskInfo, this.projectId, this.currentTasklistId).subscribe((newTask) => {
          this.allTasks = [newTask, ...this.allTasks];
          if (this.currentTasklistId === newTask.taskListId) {
            this.tasks = [newTask, ...this.tasks];
          }
          if (!this.currentTasklistId) {
            this.tasks = this.allTasks;
          }
        });
      }
    });
  }
  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(CreatetaskComponent, {
      data: { task: task, tasklists: this.allLists }
    });
    dialogRef.afterClosed().subscribe(updateTaskInfo => {
      if (updateTaskInfo) {
        this.taskService$.update(updateTaskInfo, task.id).subscribe((updatedTask) => {
          const index = this.tasks.map(item => item.id).indexOf(updatedTask.id);
          this.tasks = [...this.tasks.slice(0, index), updatedTask, ...this.tasks.slice(index + 1)];
        });
      }
    });
  }
  openDeleteTaskDialog(task) {

  }

  showSidebar() {
    this.isHidden = !this.isHidden;
  }
  backToProjects() {
    this.router.navigate(['/projects']);
  }
}


