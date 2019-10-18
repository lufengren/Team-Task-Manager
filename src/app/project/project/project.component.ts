import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
// import { projectCardAni } from '../../animations/projectcard';
import { IProject } from '../../domain';
import { AzureStorageService } from '../../service/azurestorage/azurestorage.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  // animations: [projectCardAni]
})
export class ProjectComponent implements OnInit {
  @Input() project: IProject;
  @Output() oninvite = new EventEmitter<IProject>();
  @Output() onedit = new EventEmitter<IProject>();
  @Output() ondelete = new EventEmitter<IProject>();
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

  constructor(private azureStorageService: AzureStorageService) { }

  ngOnInit() {
    this.imgUrl =
      // tslint:disable-next-line:max-line-length
      `https://${this.azureStorageService.accountName}.blob.core.windows.net/${this.azureStorageService.containerName}/${this.project.coverImg}`;
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


