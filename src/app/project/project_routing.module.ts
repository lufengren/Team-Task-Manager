import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectlistComponent } from './projectlist/projectlist.component';

const projectRoutes: Routes = [
  { path: '', component: ProjectlistComponent },
  { path: ':id/tasklists/tasks', loadChildren: '../task/task.module#TaskModule' }
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
