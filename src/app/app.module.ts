import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';



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
    HomeModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


