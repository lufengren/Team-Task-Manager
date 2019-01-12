import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-movetasklist',
  templateUrl: './movetasklist.component.html',
  styleUrls: ['./movetasklist.component.css']
})
export class MovetasklistComponent implements OnInit {
  lists: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<MovetasklistComponent>) { }

  ngOnInit() {
    this.lists = this.data.lists;
  }

}
