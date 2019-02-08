import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [CalendarHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule,
    ShareModule
  ],
  exports: [
    CalendarHeaderComponent
  ]
})
export class MycalendarUtilsModule { }
