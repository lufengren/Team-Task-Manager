import { Component, OnInit, Input, Output, EventEmitter, Inject, HostBinding, HostListener } from '@angular/core';
import { projectCardAni } from '../../animations/projectcard';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  animations: [projectCardAni]
})
export class ProjectComponent implements OnInit {
  @Input() project;
  @Output() oninvite = new EventEmitter<void>();
  @Output() onedit = new EventEmitter<void>();
  @Output() ondelete = new EventEmitter<void>();
  @Output() onview = new EventEmitter<void>();
  imgUrl: string;

  @HostBinding('@card') cardState = 'original';
  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'original';
  }

  constructor() { }

  ngOnInit() {
    this.imgUrl = `assets/img/project/${this.project.coverImg}`;
  }
  onClick(event: Event) {
    event.stopPropagation();
  }
  onEditProject(ev: Event) {
    this.onedit.emit(this.project);
    ev.stopPropagation();
  }
  onDelete() {
    this.ondelete.emit(this.project);
  }
}
