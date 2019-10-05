import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  title = '';
  formModel: FormGroup = this.fb.group({
    name: ['', Validators.required],
    desc: [''],
    coverImg: `${Math.floor((Math.random() * 10))}.jpeg`
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateprojectComponent>,
    private fb: FormBuilder) { }

  ngOnInit() {
    if (this.data) {
      this.formModel.controls['name'].setValue(this.data.project.name);
      this.formModel.controls['desc'].setValue(this.data.project.desc);
      this.formModel.controls['coverImg'].setValue(this.data.project.coverImg);
      this.title = 'Edit Project';
    } else {
      this.title = 'Add Project';
    }
  }
  onSubmit() {
    const newProject = {
      name: this.formModel.value.name.trim(),
      desc: this.formModel.value.desc,
      coverImg: this.formModel.value.coverImg
    };
    // this.dialogRef.close(newProject);
  }
}


