import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-createtasklist',
  templateUrl: './createtasklist.component.html',
  styleUrls: ['./createtasklist.component.css']
})
export class CreatetasklistComponent implements OnInit {

  title: string;
  taskListName: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<CreatetasklistComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    if (this.data.tasklist) {
      this.taskListName = this.data.tasklist.name;
    }
  }
  onClick() {
    if (!this.taskListName.trim()) {
      return;
    }
    this.dialogRef.close(this.taskListName.trim());
  }
}
