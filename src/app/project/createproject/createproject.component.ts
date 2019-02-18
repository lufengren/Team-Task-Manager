import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  title = '';
  formModel: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateprojectComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (this.data) {
      this.formModel = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = 'Edit Project';
    } else {
      this.formModel = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: `${Math.floor((Math.random() * 10))}.jpeg`
      });
      this.title = 'Add Project';
    }
  }
  onSubmit() {
    if (!this.formModel.valid || !this.formModel.value.name.trim()) {
      return;
    }
    const newProject = {
      name: this.formModel.value.name.trim(),
      desc: this.formModel.value.desc,
      coverImg: this.formModel.value.coverImg
    };
    this.dialogRef.close(newProject);
  }
}
