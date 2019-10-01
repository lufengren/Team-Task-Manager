import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskhomeComponent } from './taskhome/taskhome.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskComponent } from './task/task.component';



const taskRoutes: Routes = [
  {
    path: '', component: TaskhomeComponent, children: [
      { path: '', component: TasklistComponent, pathMatch: 'full' },
      { path: ':id', component: TaskComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(taskRoutes)
  ],
  exports: [
    [RouterModule]
  ]
})
export class TaskRoutingModule { }
