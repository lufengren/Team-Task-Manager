import { NgModule, SkipSelf, Optional } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadsvg } from '../tools/loadsvg';

import { HomeRoutingModule } from '../home/home_routing.module';
import 'hammerjs';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    DeleteDialogComponent
  ],
  imports: [
    ShareModule,
    BrowserAnimationsModule,
    HomeRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PageNotFoundComponent,
    DeleteDialogComponent,
    BrowserAnimationsModule,
    ShareModule,
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [
    {
      provide: 'BASE_CONFIG', useValue: {
        // uri: 'https://lucialu.azurewebsites.net'
        uri: 'http://localhost:3000'
      }
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule, ir: MatIconRegistry, ds: DomSanitizer) {
    if (parent) {
      throw new Error('Can not reload');
    }
    loadsvg(ir, ds);
  }
}


