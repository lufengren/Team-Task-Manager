import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginRoutingModule } from './login_routing.module';

import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadsvg } from '../tools/loadsvg';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    ShareModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]

})
export class LoginModule {
  constructor(ir: MatIconRegistry, ds: DomSanitizer) {
    loadsvg(ir, ds);
  }
}
