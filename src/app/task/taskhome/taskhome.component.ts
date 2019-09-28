import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CreatetaskComponent } from '../../share/createtask/createtask.component';
import { CreatetasklistComponent } from '../createtasklist/createtasklist.component';
import { DeleteDialogComponent } from '../../share/delete-dialog/delete-dialog.component';

import { TasklistService } from '../../service/tasklist.service';
import { TaskService } from '../../service/task.service';
import { ProjectService } from '../../service/project.service';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-taskhome',
  templateUrl: './taskhome.component.html',
  styleUrls: ['./taskhome.component.css']
})
export class TaskhomeComponent implements OnInit {
  lists = [];
  allTasks = [];
  projectId: string;
  currentProject;
  updateTask;

  isHidden = false;
  @Output() activeTaskItem = new EventEmitter();

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
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.tasklistService$.getByProjectId(this.projectId).subscribe(tasklists => {
      this.lists = tasklists.reverse();
    });
    this.taskService$.getByProjectId(this.projectId).subscribe(tasks => {
      this.allTasks = tasks;
    });
    this.projectService$.getById(this.projectId).subscribe(project => this.currentProject = project);
  }
  openCreateTaskDialog(projectId) {
    this.tasklistService$.getByProjectId(projectId).subscribe(tasklists => {
      const dialogRef = this.dialog.open(CreatetaskComponent, { data: { tasklists: this.lists } });
      dialogRef.afterClosed().subscribe(newTask => {
        if (newTask) {
          this.taskService$.add(newTask).subscribe(task => {
            this.updateTask = task;
          });
        }
      }
      );
    });
  }
  openEditTaskDialog(task) {
    const dialogRef = this.dialog.open(CreatetaskComponent, { data: { task: task, tasklists: this.lists } });
    dialogRef.afterClosed().subscribe(updatedInfo => {
      if (updatedInfo) {
        this.taskService$.update(updatedInfo, task.id).subscribe(
          updateTask => this.updateTask = updateTask
        );
      }
    }
    );
  }
  toggleTaskStatus(task) {
    const updateInfo = {
      completed: !task.completed
    };
    this.taskService$.update(updateInfo, task.id).subscribe(
      updatedtask => this.updateTask = updatedtask);
  }
  openCreateTaskListDialog() {
    const dialogRef = this.dialog.open(CreatetasklistComponent, { data: { title: 'Add Tasklist' } });
    dialogRef.afterClosed().subscribe(name => {
      const taskListInfo = {
        name: name,
        projectId: this.projectId,
      };
      this.tasklistService$.add(taskListInfo).subscribe(taskList => {
        this.lists = [taskList, ...this.lists];
      });
    });
  }
  openEditTaskListDialog(list) {
    const dialogRef = this.dialog.open(CreatetasklistComponent, { data: { tasklist: list, title: 'Edit Tasklist' } });
    dialogRef.afterClosed().subscribe(
      updatedname => {
        if (updatedname) {
          this.tasklistService$.update({ name: updatedname }, list.id, this.projectId).subscribe(
            (updatedTasklist) => {
              const index = this.lists.map(item => item.id).indexOf(updatedTasklist.id);
              this.lists = [...this.lists.slice(0, index), updatedTasklist, ...this.lists.slice(index + 1)];
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
        this.tasklistService$.delete(list).subscribe(
          () => {
            this.lists = this.lists.filter(item => item.id !== list.id);
            this.router.navigate(['/projects', this.projectId, 'tasklists']);
          }
        );
      }
    });
  }

  showSidebar() {
    this.isHidden = !this.isHidden;
  }
}
