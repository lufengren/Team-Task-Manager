import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITasklist } from '../../domain';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent implements OnInit {
  title: string;
  tasklists: ITasklist[] = this.data.tasklists;
  currentTasklist: string;
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
  formModel: FormGroup = this.fb.group({
    desc: ['', Validators.required],
    taskList: ['', Validators.required],
    priority: ['', Validators.required],
    startDate: [''],
    endDate: ['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreatetaskComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.data.task) {
      this.formModel = this.fb.group({
        desc: [this.data.task.desc, Validators.required],
        taskList: [this.data.tasklists, Validators.required],
        priority: [this.data.task.priority, Validators.required],
        startDate: [this.data.task.startDate],
        endDate: [this.data.task.endDate]
      });
      this.title = 'Edit task';
    } else {
      this.title = 'Create task';
    }
  }
  onSubmit() {
    this.dialogRef.close(this.formModel.value);
  }
}



