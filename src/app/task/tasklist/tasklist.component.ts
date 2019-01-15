import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  numberOfTasks;
  constructor() { }

  ngOnInit() {
  }
  passNumberOfTasks(num) {
    console.log(num);
    this.numberOfTasks = num;
  }
}
