import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { ProjectlistComponent } from './projectlist/projectlist.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ProjectComponent } from './project/project.component';


import { ProjectRoutingModule } from './project_routing.module';


@NgModule({
  declarations: [
    ProjectlistComponent,
    CreateprojectComponent,
    ProjectComponent
  ],
  imports: [
    ShareModule,
    ProjectRoutingModule
  ],
  entryComponents: [
    CreateprojectComponent
  ],
  exports: [
    ProjectlistComponent
  ]
})
export class ProjectModule { }
