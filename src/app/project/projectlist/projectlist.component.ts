import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAni } from '../../animations/router';
import { ActivatedRoute } from '@angular/router';

import { CreateprojectComponent } from '../createproject/createproject.component';
import { InvitememberComponent } from '../invitemember/invitemember.component';
import { DeleteDialogComponent } from '../../share/delete-dialog/delete-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProjectService } from 'src/app/service/project.service';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  animations: [routerAni]
})
export class ProjectlistComponent implements OnInit {
  // @HostBinding('@routerAni')

  projects = [];
  constructor(private dialog: MatDialog, private service$: ProjectService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.service$.get().subscribe(projects => this.projects = projects.reverse());
  }

  openCreateProjectDialog() {
    const dialogRef = this.dialog.open(CreateprojectComponent);
    dialogRef.afterClosed().subscribe(newProject => {
      if (newProject) {
        this.service$.add(newProject).subscribe(res => {
          if (res) {
            this.projects = [res, ...this.projects];
          }
        });
      }
    });
  }
  // openInviteMemberDialog() {
  //   const dialogRef = this.dialog.open(InvitememberComponent);
  // }
  openEditProjectDialog(project) {
    const dialogRef = this.dialog.open(CreateprojectComponent, { data: { project: project } });
    dialogRef.afterClosed().subscribe(updateProject => {
      const updateInfo = {
        name: updateProject.name,
        desc: updateProject.desc
      };
      this.service$.update(updateInfo, project.id).subscribe(
        updatedProject => {
          const index = this.projects.map(p => p.id).indexOf(updatedProject.id);
          this.projects = [...this.projects.slice(0, index), updatedProject, ...this.projects.slice(index + 1)];
        });
    });
  }

  openDeleteProjectDialog(project) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,
      { data: { title: 'Delete project', content: 'delete this project will delete all tasklists and tasks under it' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.service$.delete(project).subscribe(() => this.projects = this.projects.filter(item => item.id !== project.id));
      }
    });
  }

}
