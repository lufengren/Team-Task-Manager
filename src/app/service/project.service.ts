import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '../domain';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError } from './handleError.service';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient,
    @Inject('BASE_CONFIG') private config,
    private handleError: HandleError
  ) { }

  // add a new project,backend check if project exists
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<Project>(uri, project, { headers: this.headers }).pipe(
      catchError(this.handleError.handleError)
    );
  }

  // update a project,backend check if updated project name exists
  update(updateInfo: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${updateInfo.id}`;
    return this.http.put<Project>(uri, updateInfo, { headers: this.headers }).pipe(
      catchError(this.handleError.handleError)
    );
  }

  // when delete project,backend needs to delete all of related tasklists and tasks
  delete(id: string): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.delete<Project>(uri, { headers: this.headers }).pipe(
      catchError(this.handleError.handleError)
    );
  }

  // should send page size and page number together
  get(): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Project[]>(uri).pipe(
      catchError(this.handleError.handleError)
    );
  }

  getById(projectId: string): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    return this.http.get<Project>(uri).pipe(
      catchError(this.handleError.handleError)
    );
  }

  search(term: string): Observable<Project[]> {
    if (!term.trim()) {
      return of([]);
    }
    const uri = `${this.config.uri}/${this.domain}?name_like=${term}`;
    return this.http.get<Project[]>(uri).pipe(
      catchError(this.handleError.handleError)
    );
  }

  getLength(): Observable<number> {
    // const uri = `${this.config.uri}/${this.domain}?count=true`;
    // return this.http.get<number>(uri)
    //   .pipe(catchError(this.handleError.handleError));
    return (of(15));
  }

}

