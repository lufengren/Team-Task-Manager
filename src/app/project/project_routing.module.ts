import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectlistComponent } from './projectlist/projectlist.component';
import { TaskhomeComponent } from '../task/taskhome/taskhome.component';


const projectRoutes: Routes = [
  { path: 'projects', component: ProjectlistComponent },
  { path: 'projects/:id', component: TaskhomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(projectRoutes)
  ],
  exports: [
    [RouterModule]
  ]
})
export class ProjectRoutingModule { }
