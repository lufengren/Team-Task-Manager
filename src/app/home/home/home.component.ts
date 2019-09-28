import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import SunsetTheme from 'highcharts/themes/sunset';
import { Observable } from 'rxjs';
import { ProjectService } from '.././../service/project.service';
import { TasklistService } from '../../service/tasklist.service';
import { TaskService } from '../../service/task.service';

// SunsetTheme(Highcharts);
Highcharts.setOptions({
  title: {
    style: {
      color: '#212121'
    }
  },
  legend: {
    enabled: true
  }
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private numberOfProjects$: Observable<number>;
  private numberOfTasklists$: Observable<number>;
  private numberOfTasks$: Observable<number>;
  private Highcharts = Highcharts;
  project = {
    title: { text: 'Projects' },
    yAxis: {
      title: { text: 'Number of Projects' }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'project',
      data: [10, 13, 15, 6],
      zones: [{
        color: '#278AE2'
      }]
    }
    ]
  };
  task = {
    chart: {
      type: 'column'
    },
    title: { text: 'Tasks' },
    yAxis: {
      title: { text: 'Number of Tasks' }
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
      name: 'task',
      data: [15, 20, 11, 12],
      zones: [{
        color: '#278AE2'
      }]
    }
    ]
  };
  taskshare = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: 'Tasks Priority Share',
      align: 'center',
      verticalAlign: 'middle',
      y: 50
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '130%'
      }
    },
    series: [{
      type: 'pie',
      name: 'tasks',
      innerSize: '50%',
      data: [
        ['High-level', 26],
        ['Mid-level', 36],
        {
          name: 'Low-level',
          y: 30,
          dataLabels: {
            enabled: false
          }
        }
      ],
    }
    ]
  };

  constructor(private projects$: ProjectService, private tasklists$: TasklistService, private tasks$: TaskService) { }

  ngOnInit() {
    this.numberOfProjects$ = this.projects$.getLength();
    this.numberOfTasklists$ = this.tasklists$.getLength();
    this.numberOfTasks$ = this.tasks$.getLength();
    // this.projects$.getLength().subscribe(number => this.numberOfProjects = number);
    // this.tasklists$.getLength().subscribe(number => this.numberOfTasklists = number);
    // this.tasks$.getLength().subscribe(number => this.numberOfTasks = number);
  }

}
