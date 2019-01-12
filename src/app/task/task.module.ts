import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { TaskhomeComponent } from './taskhome/taskhome.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { TaskheaderComponent } from './taskheader/taskheader.component';
import { TaskitemComponent } from './taskitem/taskitem.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { MovetasklistComponent } from './movetasklist/movetasklist.component';
import { CreatetasklistComponent } from './createtasklist/createtasklist.component';
import { QuicktaskComponent } from './quicktask/quicktask.component';

import { TaskRoutingModule } from './task_routing.module';



@NgModule({
  declarations: [
    TaskhomeComponent,
    TasklistComponent,
    TaskheaderComponent,
    TaskitemComponent,
    CreatetaskComponent,
    MovetasklistComponent,
    CreatetasklistComponent,
    QuicktaskComponent
  ],
  imports: [
    ShareModule,
    TaskRoutingModule
  ],
  entryComponents: [
    CreatetaskComponent,
    MovetasklistComponent,
    CreatetasklistComponent
  ],
  exports: [
    TaskhomeComponent,
    TasklistComponent,
    TaskheaderComponent,
    TaskitemComponent,
    CreatetaskComponent,
    MovetasklistComponent,
    CreatetasklistComponent,
    QuicktaskComponent,
    ShareModule
  ]
})
export class TaskModule { }
