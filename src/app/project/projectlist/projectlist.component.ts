import { Component, OnInit, HostBinding } from '@angular/core';
import { routerAni } from '../../animations/router';

import { CreateprojectComponent } from '../createproject/createproject.component';
import { DeleteDialogComponent } from '../../core/delete-dialog/delete-dialog.component';

import { MatDialog } from '@angular/material';
import { ProjectService } from 'src/app/service/project.service';
import { Project } from '../../domain/project.model';
import { AzureStorageService } from '../../service/azurestorage/azurestorage.service';
@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  animations: [routerAni]
})
export class ProjectlistComponent implements OnInit {
  // @HostBinding('@routerAni')
  projects: Project[];
  constructor(
    private dialog: MatDialog,
    private service$: ProjectService,
    private azureStorageService: AzureStorageService
  ) { }

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
        const fileInfo = newProject.get('coverImg');
        this.azureStorageService.uploadFile(fileInfo).subscribe(() => {
          console.log('hit sub');
          newProject.set('coverImg', fileInfo.name);
          const formattedNewProject = {
            name: newProject.get('name'),
            desc: newProject.get('desc'),
            coverImg: newProject.get('coverImg')
          };
          console.log(formattedNewProject);
          this.service$.add(formattedNewProject).subscribe(res => {
            this.projects = [res, ...this.projects];
          });
        });
        // .subscribe(() => {
        //   console.log('hit here');
        //   newProject.set('coverImg', fileInfo.name);
        //   this.service$.add(newProject).subscribe(res => {
        //     this.projects = [res, ...this.projects];
        //   });
        // });
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

  // createContainer() {
  //   this.azureStorageService.createContainer().subscribe(res => console.log(res));
  // }

}
