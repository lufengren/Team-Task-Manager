import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invitemember',
  templateUrl: './invitemember.component.html',
  styleUrls: ['./invitemember.component.css']
})
export class InvitememberComponent implements OnInit {
  members = [
    {
      id: 1,
      name: 'Jhon'
    },
    {
      id: 2,
      name: 'Kelly'
    },
    {
      id: 3,
      name: 'Amy'
    }
  ];
  constructor() { }

  ngOnInit() {
  }
  displayMember(member: { id: string, name: string }) {
    return member ? member.name : '';

  }
}
