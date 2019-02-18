import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pagenotfound/pagenotfound.component';


const appRoutes: Routes = [
  { path: 'projects', loadChildren: './project/project.module#ProjectModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#MyCalendarModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    [RouterModule]
  ]
})
export class AppRoutingModule { }

