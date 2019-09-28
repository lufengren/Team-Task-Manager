import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() hideSideMenu = new EventEmitter<void>();
  constructor() { }

  hideSidebar() {
    this.hideSideMenu.emit();
  }
}
