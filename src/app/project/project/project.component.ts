import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
// import { projectCardAni } from '../../animations/projectcard';
import { Project } from '../../domain/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  // animations: [projectCardAni]
})
export class ProjectComponent implements OnInit {
  @Input() project: Project;
  @Output() oninvite = new EventEmitter<Project>();
  @Output() onedit = new EventEmitter<Project>();
  @Output() ondelete = new EventEmitter<Project>();
  @Output() onview = new EventEmitter<Project>();
  imgUrl: string;

  // @HostBinding('@card') cardState = 'original';
  // @HostListener('mouseenter')
  // onMouseEnter() {
  //   this.cardState = 'hover';
  // }
  // @HostListener('mouseleave')
  // onMouseLeave() {
  //   this.cardState = 'original';
  // }

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
