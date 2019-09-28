// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { CreatetasklistComponent } from './createtasklist.component';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

// describe('create task list component', () => {
//     let comp: CreatetasklistComponent;
//     let fixture: ComponentFixture<CreatetasklistComponent>;
//     let createtasklistEle: HTMLElement;
//     let titleEle: HTMLElement;
//     let inputEle: HTMLElement;
//     const dataStub = {
//         title: 'Add Tasklist',
//         tasklist: null
//     };
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [CreatetasklistComponent],
//             providers: [
//                 { provide: MAT_DIALOG_DATA, userValue: dataStub }
//             ]
//         });
//         fixture = TestBed.createComponent(CreatetasklistComponent);
//         comp = fixture.componentInstance;
//         createtasklistEle = fixture.nativeElement();
//         titleEle = createtasklistEle.querySelector('.tasklist-title');
//         inputEle = createtasklistEle.querySelector('input[name="taskListName"]');
//     });
//     it('should create', () => {
//         expect(comp).toBeDefined();
//     });
//     it('should not have title and tasklist name after construction', () => {
//         expect(comp.title).toBeUndefined();
//         expect(comp.taskListName).toBeUndefined();
//         fixture.detectChanges();
//         expect(titleEle.textContent).toBe('');
//         expect(inputEle.nodeValue).toBe('');
//     });
//     it('should have title after user click "add tasklist" button and Angular calls ngOnInit', () => {
//         comp.ngOnInit();
//         expect(comp.title).toEqual(dataStub.title);
//         expect(comp.taskListName).toBeUndefined();
//     });
//     it('should have title and task list name after user click "edit tasklist" button and Angular calls ngOnInit', () => {
//         dataStub.title = 'Edit Tasklist';
//         dataStub.tasklist = {
//             name: 'test tasklist name'
//         };
//         comp.ngOnInit();
//         expect(comp.title).toEqual(dataStub.title);
//         expect(comp.taskListName).toEqual(dataStub.tasklist.name);
//     });
// });







