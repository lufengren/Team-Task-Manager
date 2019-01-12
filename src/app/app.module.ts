import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app_routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareModule,
    CoreModule,
    LoginModule,
    TaskModule,
    ProjectModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


