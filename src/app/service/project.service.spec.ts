import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProjectService } from './project.service';

describe('ProjectServiceTesting', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  const baseURI = 'http://localhost:3000';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService,
        {
          provide: 'BASE_CONFIG', useValue: {
            uri: baseURI
          }
        }]
    });
    service = TestBed.get(ProjectService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('# add new project', () => {
    const dummyProject = {
      status: 1,
      id: '1',
      name: 'Book',
      desc: 'Students read either novels or selections.',
      coverImg: 'https://ImageServer/123'
    };
    it('should return an Observable<Project>', () => {
      service.add({
        name: 'Book',
        desc: 'Students read either novels or selections.',
        coverImg: 'https://ImageServer/123'
      }).subscribe(res => {
        expect(res).toEqual(dummyProject);
      });
      const req = httpMock.expectOne(`${baseURI}/projects`);
      expect(req.request.method).toBe('POST');
      req.flush(dummyProject);
    });
  });
  describe('# update a project', () => {
    it('should return an Observable<Project>', () => {
      const dummyUpdatedProject = {
        id: '2',
        name: 'BookClub',
        desc: 'Students read either novels or selections.',
        coverImg: 'https://ImageServer/123'
      };
      service.update({
        name: 'BookClub',
        desc: 'Students read either novels or selections.',
        coverImg: 'https://ImageServer/123',
        id: '2'
      }).subscribe((res) => {
        expect(res).toEqual(dummyUpdatedProject);
      });
      const req = httpMock.expectOne(`${baseURI}/projects/2`);
      expect(req.request.method).toBe('PUT');
      req.flush(dummyUpdatedProject);
    });
  });
  describe('# delete a project', () => {
    it('should return an Observable<Project>', () => {
      const dummyDeletedProject = {
        status: 1,
        id: '2',
        name: 'BookClub',
        desc: 'Students read either novels or selections.',
        coverImg: 'https://ImageServer/123'
      };
      service.delete('2').subscribe((res) => {
        expect(res).toEqual(dummyDeletedProject);
      });
      const req = httpMock.expectOne(`${baseURI}/projects/2`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyDeletedProject);
    });
  });
  describe('# get a project', () => {
    it('should return an Observable<Project>', () => {
      const dummyProject = {
        status: 1,
        id: '3',
        name: 'BookClub',
        desc: 'Students read either novels or selections.',
        coverImg: 'https://ImageServer/123'
      };
      service.getById('3').subscribe((res) => {
        expect(res).toEqual(dummyProject);
      });
      const req = httpMock.expectOne(`${baseURI}/projects/3`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProject);
    });
  });
  describe('# get projects', () => {
    it('should return an Observable<Project[]>', () => {
      const dummyProjects = [
        {
          id: '1',
          name: 'Book',
          desc: 'Students read either novels or selections.',
          coverImg: 'https://ImageServer/123'
        },
        {
          id: '2',
          name: 'Clubs',
          desc: 'select people (fictional, famous, or otherwise).',
          coverImg: 'https://ImageServer/21'
        },
      ];
      service.get().subscribe((projects) => {
        expect(projects).toEqual(dummyProjects);
      });
      const req = httpMock.expectOne(`${baseURI}/projects`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyProjects);
    });
  });
  describe('# search projects', () => {
    it('should return an Observable<Project[]> based on search keyword', () => {
      const dummySearchRes = [
        {
          id: '3',
          name: 'bookOne',
          desc: 'Students read either novels or selections.',
          coverImg: 'https://ImageServer/12'
        },
        {
          id: '2',
          name: 'bookTwo',
          desc: 'select people (fictional, famous, or otherwise).',
          coverImg: 'https://ImageServer/51'
        },
      ];
      service.search('book').subscribe((res) => {
        expect(res).toEqual(dummySearchRes);
      });
      const req = httpMock.expectOne(`${baseURI}/projects?name_like=book`);
      expect(req.request.method).toBe('GET');
      req.flush(dummySearchRes);
    });
  });
});
