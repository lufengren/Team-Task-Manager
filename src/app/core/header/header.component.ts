import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<void>();
  constructor() { }

  toggleSidebar() {
    this.toggle.emit();
  }
}
