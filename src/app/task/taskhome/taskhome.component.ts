import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { switchMap } from 'rxjs/operators';

import { CreatetaskComponent } from '../createtask/createtask.component';
import { MovetasklistComponent } from '../movetasklist/movetasklist.component';
import { CreatetasklistComponent } from '../createtasklist/createtasklist.component';
import { DeleteDialogComponent } from '../../share/delete-dialog/delete-dialog.component';

import { TasklistService } from '../../service/tasklist.service';
import { TaskService } from '../../service/task.service';
import { ProjectService } from '../../service/project.service';

import { ActivatedRoute, Router } from '@angular/router';
import { taskItemAni } from 'src/app/animations/taskitem';

@Component({
  selector: 'app-taskhome',
  templateUrl: './taskhome.component.html',
  styleUrls: ['./taskhome.component.css']
})
export class TaskhomeComponent implements OnInit {
  lists;
  projectId;
  newTask;
  updatedTask;
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
    this.activatedRoute.paramMap.pipe(
      switchMap(
        params => {
          this.projectId = params.get('id');
          return this.tasklistService$.getByProjectId(this.projectId);
        })
    ).subscribe(tasklists => this.lists = tasklists);
    // const projectId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.lists$ = this.service$.get(projectId);
  }

  openCreateTaskDialog(tasklistId) {
    const dialogRef = this.dialog.open(CreatetaskComponent);
    dialogRef.afterClosed().subscribe(newTask => {
      if (newTask) {
        newTask['taskListId'] = tasklistId;
        this.taskService$.add(newTask, tasklistId).subscribe(task => {
          this.newTask = task;
        });
      }
    }
    );
  }
  openEditTaskDialog(task) {
    const dialogRef = this.dialog.open(CreatetaskComponent, { data: { task: task } });
    dialogRef.afterClosed().subscribe(updatedInfo =>
      this.taskService$.update(updatedInfo, task.id).subscribe(
        updatedtask => this.updatedTask = updatedtask
      )
    );
  }
  toggleTaskStatus(task) {
    const updateInfo = {
      completed: !task.completed
    };
    this.taskService$.update(updateInfo, task.id).subscribe(
      updatedtask => this.updatedTask = updatedtask);
  }
  openCreateTaskListDialog() {
    const dialogRef = this.dialog.open(CreatetasklistComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        const taskListInfo = {
          name: name,
          projectId: this.projectId,
        };
        this.tasklistService$.add(taskListInfo, this.projectId).subscribe(taskList => {
          this.lists = [taskList, ...this.lists];
        }
        );
      }
    });
  }
  openEditTaskListDialog(list) {
    const dialogRef = this.dialog.open(CreatetasklistComponent, { data: { tasklist: list } });
    dialogRef.afterClosed().subscribe(
      updatedname => this.tasklistService$.update({ name: updatedname }, list.id, this.projectId).subscribe(
        (updatedTasklist) => {
          const index = this.lists.map(item => item.id).indexOf(updatedTasklist.id);
          this.lists = [...this.lists.slice(0, index), updatedTasklist, ...this.lists.slice(index + 1)];
        }
      )
    );
  }
  openDeleteTaskListDialog(list) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete tasklist',
        content: 'delete tasklist will delete all taskitems under it'
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'true') {
        this.tasklistService$.delete(list).subscribe(
          () => {
            this.lists = this.lists.filter(item => item.id !== list.id);
          }
        );
      }
    });
  }

  createQuickTask(desc, id) {
    const newTask = {
      desc: desc,
      taskListId: id,
      completed: false,
      priority: 3,
      createDate: new Date()
    };
    this.taskService$.add(newTask, this.projectId).subscribe(task => {
      this.newTask = task;
    });
  }
  backToProjects() {
    this.router.navigate(['/projects', { id: this.projectId }]);
  }
  // openMoveTaskListDialog() {
  //   this.dialog.open(MovetasklistComponent, { data: { lists: this.lists } });
  // }
}
