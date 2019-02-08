import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mwl-utils-calendar-header',
  template: `
    <div class="bottom-content">
      <div class="bottom-content-button">
          <div
            mwlCalendarPreviousView 
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            <button mat-icon-button>
              <mat-icon aria-label="icon-button with a arrow icon">chevron_left</mat-icon>
            </button>
          </div>
          <div class="today"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            <span>{{ viewDate | calendarDate:(view + 'ViewTitle'):locale }}</span>
          </div>
          <div
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)">
            <button mat-icon-button>
              <mat-icon aria-label="icon-button with a arrow icon">chevron_right</mat-icon>
            </button>
          </div>
      </div>
    </div>
    <br>
  `,
  styles: [`
  .bottom-content-title {
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .bottom-content-button {
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .today {
    font-size:1.5rm;
    display:flex;
    align-items:center;
  }
  .today span {
    font-size: 1.5rem;
  }
  .today span:hover {
    cursor:pointer;
  }
  `
  ]

})
export class CalendarHeaderComponent {
  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();
}
