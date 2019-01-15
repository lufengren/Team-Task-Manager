import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // items: string[];
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit() {
    // const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    // this.items = nums.map(item => `avatars:svg-${item}`);
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      passwordGroup: this.fb.group({
        password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        repeat: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, { validator: this.isPasswordEqual })
    });
  }
  isPasswordEqual(group: FormGroup) {
    const password: FormControl = group.get('password') as FormControl;
    const confirmPwd: FormControl = group.get('repeat') as FormControl;
    const isEqual: boolean = (password.value === confirmPwd.value);
    // console.log('valid result is ' + isEqual);
    return isEqual ? null : { equal: 'password does not match confirm password ' };
  }

  onSubmit() {
    const registerInfo = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwordGroup.password
    };
  }
}
