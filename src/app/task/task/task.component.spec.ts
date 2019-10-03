import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { ShareModule } from '../../share/share.module';
import { TaskService } from '../../service/task.service';
import { Task } from '../../domain/task.model';
import { asyncData } from '../../testing/async-observable-helper';
import { By } from '@angular/platform-browser';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: any;
  let taskDescEle: HTMLElement;
  let taskEndDateEle: HTMLElement;
  let editDebugEle: any;

  const expectedTask = {
    id: '2',
    desc: 'test task',
    completed: true,
    priority: 3,
    endDate: '05-12-19',
    taskListId: '3',
    projectId: '7'
  };
  const testTask = {
    id: '2',
    desc: 'test task desc',
    completed: true,
    priority: 3,
    taskListId: '3',
    projectId: '7'
  };

  beforeEach(() => {
    taskService = jasmine.createSpyObj('TaskService', ['update']);
    taskService.update.and.returnValue(asyncData(testTask));
    TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [ShareModule],
      providers: [{ provide: TaskService, useValue: taskService }]
    });
    fixture = TestBed.createComponent(TaskComponent);
    editDebugEle = fixture.debugElement.query(By.css('.edit-button'));
    const hostEle = fixture.nativeElement;
    component = fixture.componentInstance;
    component.task = expectedTask;
    taskDescEle = hostEle.querySelector('.desc-detail');
    taskEndDateEle = hostEle.querySelector('.due-date');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show task info correctly', () => {
    fixture.detectChanges();
    expect(taskDescEle.textContent).toEqual(expectedTask.desc);
    expect(taskEndDateEle.textContent).toEqual(expectedTask.endDate);
  });
  it('should switch task status correctly', fakeAsync(
    () => {
      component.toggleTaskStatus(expectedTask);
      expect(expectedTask.completed).toBeFalsy();
      component.toggleTaskStatus(expectedTask);
      expect(expectedTask.completed).toBeTruthy();
      tick();
      expect(expectedTask.completed === testTask.completed).toBeTruthy();
    })
  );

  it('should raise edit task event when clicked', () => {
    let editTask: Task;
    component.emitEdit.subscribe((task: Task) => {
      editTask = task;
    });
    editDebugEle.triggerEventHandler('click', expectedTask);
    expect(editTask === expectedTask).toBeTruthy();
  });
});
