import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { TaskhomeComponent } from './taskhome/taskhome.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskComponent } from './task/task.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { CreatetasklistComponent } from './createtasklist/createtasklist.component';

import { TaskRoutingModule } from './task_routing.module';

@NgModule({
  declarations: [
    TaskhomeComponent,
    TasklistComponent,
    TaskComponent,
    CreatetaskComponent,
    CreatetasklistComponent
  ],
  imports: [
    ShareModule,
    TaskRoutingModule
  ],
  entryComponents: [
    CreatetasklistComponent,
    CreatetaskComponent
  ]
})
export class TaskModule { }
