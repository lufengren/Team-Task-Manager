import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { ProjectlistComponent } from './projectlist/projectlist.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ProjectComponent } from './project/project.component';
import { SearchComponent } from './search/search.component';

import { ProjectRoutingModule } from './project_routing.module';

@NgModule({
  declarations: [
    ProjectlistComponent,
    CreateprojectComponent,
    ProjectComponent,
    SearchComponent
  ],
  imports: [
    ShareModule,
    ProjectRoutingModule
  ],
  entryComponents: [
    CreateprojectComponent
  ]
})
export class ProjectModule { }


