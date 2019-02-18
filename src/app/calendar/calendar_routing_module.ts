import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MycalendarComponent } from './mycalendar/mycalendar.component';

const calendarRoutes: Routes = [
    { path: '', component: MycalendarComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(calendarRoutes)
    ],
    exports: [
        [RouterModule]
    ]
})
export class CalendarRoutingModule { }
