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
      });
      this.title = 'Edit project';
    } else {
      this.formModel = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: `../../../assets/img/project/${Math.floor((Math.random() * 10))}.jpeg`
      });
      this.title = 'Create project';
    }
  }
  onSubmit() {
    if (!this.formModel.valid) {
      return;
    }
    const newProject = this.formModel.value;
    this.dialogRef.close(newProject);
  }
}
