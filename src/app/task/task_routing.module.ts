import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskhomeComponent } from './taskhome/taskhome.component';
import { TaskitemComponent } from '../task/taskitem/taskitem.component';



const taskRoutes: Routes = [
  {
    path: '', component: TaskhomeComponent, children: [
      { path: '', component: TaskitemComponent, pathMatch: 'full' },
      { path: ':id', component: TaskitemComponent, pathMatch: 'full' },
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
