import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>Page not found</p>
  `,
  styles: [`
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent { }
