// import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
// import { HomeComponent } from './home.component';
// import { ProjectService } from '../../service/project.service';
// import { TasklistService } from '../../service/tasklist.service';
// import { TaskService } from '../../service/task.service';
// import { ShareModule } from '../../share/share.module';
// import { asyncData } from '.././../testing/async-observable-helper';

// describe('home component', () => {
//     let comp: HomeComponent;
//     let fixture: ComponentFixture<HomeComponent>;
//     let homeEle: HTMLElement;
//     let projectEle: HTMLElement;
//     let tasklistEle: HTMLElement;
//     let taskEle: HTMLElement;
//     let testProjectLength: any;
//     let testTasklistLength: any;
//     let testTaskLength: any;
//     let projectService: any;
//     let tasklistService: any;
//     let taskService: any;
//     let testSpy: any;
//     beforeEach(
//         () => {
//             testProjectLength = 15;
//             testTasklistLength = 33;
//             testTaskLength = 55;

//             // Create a fake ProjectService object with a `get()` spy
//             projectService = jasmine.createSpyObj('ProjectService', ['getLength']);
//             // Make the spy return a asynchronous Observable with the test data
//             testSpy = projectService.getLength.and.returnValue(asyncData(testProjectLength));

//             tasklistService = jasmine.createSpyObj('TasklistService', ['getLength']);
//             tasklistService.getLength.and.returnValue(asyncData(testTasklistLength));

//             taskService = jasmine.createSpyObj('TaskService', ['getLength']);
//             tasklistService.getLength.and.returnValue(asyncData(testTaskLength));

//             TestBed.configureTestingModule({
//                 declarations: [HomeComponent],
//                 imports: [ShareModule],
//                 providers: [
//                     { provide: ProjectService, useValue: projectService },
//                     { provide: TasklistService, useValue: tasklistService },
//                     { provide: TaskService, useValue: taskService }
//                 ]
//             });
//             fixture = TestBed.createComponent(HomeComponent);
//             comp = fixture.debugElement.componentInstance;
//             homeEle = fixture.nativeElement;
//             projectEle = homeEle.querySelector('.projects-amount');
//             tasklistEle = homeEle.querySelector('.tasklists-amount');
//             taskEle = homeEle.querySelector('.tasks-amount');
//         }
//     );
//     // afterEach(() => {
//     //     fixture.destroy();
//     //     comp = null;
//     // });
//     it('should create', () => {
//         expect(comp).toBeDefined();
//     });
//     it('should show correct number asynchronously', fakeAsync(() => {
//         expect(projectEle.textContent).toEqual('');
//         expect(tasklistEle.textContent).toEqual('');
//         expect(taskEle.textContent).toEqual('');
//         fixture.detectChanges();
//         tick(15000);
//         fixture.detectChanges();
//         expect(projectEle.textContent).toEqual(testProjectLength.toString(), 'project amount');
//         expect(tasklistEle.textContent).toEqual(testTasklistLength.toString());
//         expect(taskEle.textContent).toEqual(testTaskLength.toString());
//     }));
// });



