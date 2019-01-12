import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-dialog',
  template: `
    <h3 mat-dialog-title>{{title}}</h3>
    <div mat-dialog-content>
      {{content}}
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="primary" (click)="onClick()">delete</button>
    </div>
  `,
  styles: []
})
export class DeleteDialogComponent implements OnInit {
  title: '';
  content;
  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }
  onClick() {
    this.dialogRef.close('true');
  }
}
