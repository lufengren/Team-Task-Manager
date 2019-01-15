import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectlistComponent } from '../project/projectlist/projectlist.component';
import { TaskhomeComponent } from '../task/taskhome/taskhome.component';


const coreRoutes: Routes = [
  { path: 'projects', component: ProjectlistComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [
    [RouterModule]
  ]
})
export class CoreRoutingModule { }
