import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MycalendarComponent } from './mycalendar/mycalendar.component';
import { MycalendarUtilsModule } from './mycalendar-utils/mycalendar-utils.module';
import { CalendarRoutingModule } from './calendar_routing_module';

// import { CreatetaskComponent } from '../task/createtask/createtask.component';

@NgModule({
  declarations: [MycalendarComponent],
  imports: [
    CommonModule,
    ShareModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MycalendarUtilsModule,
    CalendarRoutingModule
  ],
  exports: [
    MycalendarComponent
  ]
})

export class MyCalendarModule { }
