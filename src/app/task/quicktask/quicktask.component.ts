import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';


@Component({
  selector: 'app-quicktask',
  templateUrl: './quicktask.component.html',
  styleUrls: ['./quicktask.component.css']
})
export class QuicktaskComponent implements OnInit {
  @Output() quicktask = new EventEmitter();
  desc: string;
  constructor() { }

  ngOnInit() {
  }

  @HostListener('keyup.enter')
  onClick() {
    if (!this.desc || this.desc.length === 0 || !this.desc.trim()) {
      return;
    }
    this.quicktask.emit(this.desc);
    this.desc = '';
  }
}


