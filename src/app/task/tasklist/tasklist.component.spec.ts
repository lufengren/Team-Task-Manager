import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareModule } from '../../share/share.module';
import { TasklistComponent } from './tasklist.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TasklistComponent', () => {
  let component: TasklistComponent;
  let fixture: ComponentFixture<TasklistComponent>;
  const expectedList = {
    id: '3',
    name: 'Test Tasklist',
    projectId: '5'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasklistComponent],
      imports: [ShareModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasklistComponent);
    component = fixture.componentInstance;
    component.list = expectedList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
