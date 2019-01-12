import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskhomeComponent } from '../task/taskhome/taskhome.component';



const taskRoutes: Routes = [
  { path: 'tasks', component: TaskhomeComponent }
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
