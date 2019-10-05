import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAni } from '../../animations/router';
import { ActivatedRoute } from '@angular/router';

import { CreateprojectComponent } from '../createproject/createproject.component';
import { DeleteDialogComponent } from '../../core/delete-dialog/delete-dialog.component';

import { MatDialog } from '@angular/material';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from '../../domain/project.model';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  animations: [routerAni]
})
export class ProjectlistComponent implements OnInit {
  // @HostBinding('@routerAni')
  projects: Project[];
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
          this.projects = [res, ...this.projects];
        });
      }
    });
  }

  openEditProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(CreateprojectComponent, { data: { project: project } });
    dialogRef.afterClosed().subscribe(updateProject => {
      if (updateProject) {
        const updateInfo = {
          name: updateProject.name,
          desc: updateProject.desc,
          id: project.id,
          coverImg: project.coverImg
        };
        this.service$.update(updateInfo).subscribe(
          updatedProject => {
            const index = this.projects.map(p => p.id).indexOf(updatedProject.id);
            this.projects = [...this.projects.slice(0, index), updatedProject, ...this.projects.slice(index + 1)];
          });
      }
    });
  }

  openDeleteProjectDialog(project: Project) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,
      { data: { title: 'Delete Project', content: `Delete project "${project.name}" will delete all tasklists and tasks under it` } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.projects = this.projects.filter(item => item.id !== project.id);
        this.service$.delete(project.id).subscribe();
      }
    });
  }

  // openInviteMemberDialog() {
  //   const dialogRef = this.dialog.open(InvitememberComponent);
  // }

}
