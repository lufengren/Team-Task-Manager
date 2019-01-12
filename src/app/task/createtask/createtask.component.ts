import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit {
  title: string;
  formModel: FormGroup;
  formInfo;
  priorities = [
    {
      label: 'high-level',
      value: 1
    },
    {
      label: 'mid-level',
      value: 2
    },
    {
      label: 'low-level',
      value: 3
    }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreatetaskComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.data) {
      this.formModel = this.fb.group({
        desc: [this.data.task.desc, Validators.required],
        priority: [this.data.task.priority, Validators.required],
        startDate: [this.data.task.startDate],
        endDate: [this.data.task.endDate]
      });
      this.title = 'Edit task';
    } else {
      this.formModel = this.fb.group({
        desc: ['', Validators.required],
        priority: ['', Validators.required],
        startDate: [''],
        endDate: ['']
      });
      this.title = 'Create task';
    }
  }
  onSubmit() {
    console.log(this.formModel.value);
    this.dialogRef.close(this.formModel.value);
  }
}

