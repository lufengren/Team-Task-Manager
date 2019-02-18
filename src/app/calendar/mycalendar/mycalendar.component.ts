import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { TasklistService } from '../../service/tasklist.service';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CreatetaskComponent } from '../../share/createtask/createtask.component';
import { colors } from '../mycalendar-utils/colors';

@Component({
  selector: 'app-mwl-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.css']
})


export class MycalendarComponent implements OnInit {

  view = 'month';
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent>>;
  activeDayIsOpen = false;

  constructor(private taskService$: TaskService, private tasklistService$: TasklistService, private dialog: MatDialog) { }
  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const start = format(getStart(this.viewDate));
    const end = format(getEnd(this.viewDate));
    this.events$ = this.taskService$.getByDate(start, end).pipe(map(tasks => {
      return tasks.map(task => {
        return {
          title: task.desc,
          start: new Date(task.endDate),
          allDay: true,
          meta: {
            task
          }
        };
      });
    }));
  }

  dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent>; }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent): void {
    this.tasklistService$.getById(event.meta.task.taskListId).subscribe(tasklist => {
      this.tasklistService$.getByProjectId(tasklist.projectId).subscribe(tasklists => {
        const dialogRef = this.dialog.open(CreatetaskComponent, { data: { task: event.meta.task, tasklists: tasklists } });
        dialogRef.afterClosed().subscribe(updatedInfo => {
          if (updatedInfo) {
            this.taskService$.update(updatedInfo, event.meta.task.id).subscribe(
              updateTask => this.fetchEvents()
            );
          }
        }
        );
      });
    });
  }

}


// export interface CalendarEvent<MetaType = any> {
//   id?: string | number;
//   start: Date;
//   end?: Date;
//   title: string;
//   color?: EventColor;
//   actions?: EventAction[];
//   allDay?: boolean;
//   cssClass?: string;
//   resizable?: {
//       beforeStart?: boolean;
//       afterEnd?: boolean;
//   };
//   draggable?: boolean;
//   meta?: MetaType;
// }
