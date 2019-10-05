import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShareModule } from '../../share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateprojectComponent } from './createproject.component';

describe('Create Project Component', () => {
    let comp: CreateprojectComponent;
    let fixture: ComponentFixture<CreateprojectComponent>;
    let projectTitleEle: HTMLElement;
    let projectNameEle: HTMLInputElement;
    let projectDescEle: HTMLInputElement;
    const testData = {
        project: {
            name: 'test project',
            desc: 'test desc'
        }
    };
    let nameFormControl: AbstractControl;
    let descFormControl: AbstractControl;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CreateprojectComponent],
            imports: [ShareModule, BrowserAnimationsModule],
            providers: [
                FormBuilder,
                { provide: MAT_DIALOG_DATA, useValue: testData },
                { provide: MatDialogRef, useValue: {} }
            ],
        });
        fixture = TestBed.createComponent(CreateprojectComponent);
        const hostEle = fixture.nativeElement;
        comp = fixture.componentInstance;
        projectTitleEle = hostEle.querySelector('.project-title');
        projectNameEle = hostEle.querySelector('.project-name');
        projectDescEle = hostEle.querySelector('.project-desc');
        nameFormControl = comp.formModel.controls['name'];
        descFormControl = comp.formModel.controls['desc'];
    });
    it('should create', () => {
        expect(comp).toBeTruthy();
    });

    it('should show project info correctly', () => {
        comp.ngOnInit();
        expect(comp.title).toBe('Edit Project');
        expect(comp.formModel.value.name).toBe('test project');
        expect(comp.formModel.value.desc).toBe('test desc');
        fixture.detectChanges();
        expect(projectTitleEle.textContent).toBe('Edit Project');
        expect(projectNameEle.value).toBe('test project');
        expect(projectDescEle.value).toBe('test desc');
    });
    it('should validate project', () => {
        comp.ngOnInit();
        expect(nameFormControl.valid).toBeTruthy();
        expect(comp.formModel.valid).toBeTruthy();
        nameFormControl.setValue('');
        expect(nameFormControl.valid).toBeFalsy();
        expect(comp.formModel.valid).toBeFalsy();
    });
    it('should update value from view to component', () => {
        fixture.detectChanges();
        projectNameEle.value = 'new project';
        projectDescEle.value = 'new desc';
        projectNameEle.dispatchEvent(new Event('input'));
        projectDescEle.dispatchEvent(new Event('input'));
        expect(nameFormControl.value).toBe('new project');
        expect(descFormControl.value).toBe('new desc');
    });
});
