import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-createtasklist',
  templateUrl: './createtasklist.component.html',
  styleUrls: ['./createtasklist.component.css']
})
export class CreatetasklistComponent implements OnInit {

  title: string;
  taskListName;
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<CreatetasklistComponent>) { }

  ngOnInit() {
    if (this.data) {
      this.taskListName = this.data.tasklist.name;
    }
  }
  onClick() {
    if (!this.taskListName || this.taskListName.length === 0 || !this.taskListName.trim()) {
      return;
    }
    this.dialogRef.close(this.taskListName);
  }
}
