import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProjectComponent } from './project.component';
import { ProjectModule } from '../project.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('project component', () => {
    let comp: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;
    let projectNameEle: HTMLElement;
    let projectDescEle: HTMLElement;
    // mock the project supplied by parent comp
    const expectedProject = {
        name: 'Book Club',
        desc: 'book club description'
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            // declarations: [ProjectComponent],
            imports: [ProjectModule,
                RouterTestingModule]
        });
        fixture = TestBed.createComponent(ProjectComponent);
        comp = fixture.componentInstance;
        const projectEle = fixture.nativeElement;
        projectNameEle = projectEle.querySelector('.project-name');
        projectDescEle = projectEle.querySelector('.project-desc');
        // simulate the parent setting the input property with mock project
        comp.project = expectedProject;
    });
    it('should create', () => {
        expect(comp).toBeDefined();
    });
    it('should bind project data and display project name and desc after construction', () => {
        expect(projectNameEle.textContent).toEqual('');
        expect(projectDescEle.textContent).toEqual('');
        expect(comp.project).toEqual(expectedProject);
        fixture.detectChanges();
        expect(projectNameEle.textContent).toEqual(expectedProject.name);
        expect(projectDescEle.textContent).toEqual(expectedProject.desc);
    });
    // it('should have title after user click "add tasklist" button and Angular calls ngOnInit', () => {
    //     comp.ngOnInit();
    //     expect(comp.title).toEqual(dataStub.title);
    //     expect(comp.taskListName).toBeUndefined();
    // });
    // it('should have title and task list name after user click "edit tasklist" button and Angular calls ngOnInit', () => {
    //     dataStub.title = 'Edit Tasklist';
    //     dataStub.tasklist = {
    //         name: 'test tasklist name'
    //     };
    //     comp.ngOnInit();
    //     expect(comp.title).toEqual(dataStub.title);
    //     expect(comp.taskListName).toEqual(dataStub.tasklist.name);
    // });
});







