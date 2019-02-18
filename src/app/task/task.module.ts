import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { TaskhomeComponent } from './taskhome/taskhome.component';
import { TaskitemComponent } from './taskitem/taskitem.component';
// import { CreatetaskComponent } from './createtask/createtask.component';
import { CreatetasklistComponent } from './createtasklist/createtasklist.component';

import { TaskRoutingModule } from './task_routing.module';

@NgModule({
  declarations: [
    TaskhomeComponent,
    TaskitemComponent,
    CreatetasklistComponent
  ],
  imports: [
    ShareModule,
    TaskRoutingModule
  ],
  entryComponents: [
    CreatetasklistComponent
  ],
  exports: [
    TaskhomeComponent,
    TaskitemComponent,
    CreatetasklistComponent,
  ]
})
export class TaskModule { }
