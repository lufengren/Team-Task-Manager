import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../domain';
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
  add(project: IProject): Observable<IProject> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<IProject>(uri, project, { headers: this.headers }).pipe(
      catchError(this.handleError.handleError));
  }

  // update a project,backend check if updated project name exists
  update(updateInfo: IProject): Observable<IProject> {
    const uri = `${this.config.uri}/${this.domain}/${updateInfo.id}`;
    return this.http.put<IProject>(uri, updateInfo, { headers: this.headers }).pipe(
      catchError(this.handleError.handleError)
    );
  }

  // when delete project,backend needs to delete all of related tasklists and tasks
  delete(id: string): Observable<IProject> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.delete<IProject>(uri, { headers: this.headers }).pipe(
      catchError(this.handleError.handleError)
    );
  }

  // should send page size and page number together
  get(): Observable<IProject[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<IProject[]>(uri).pipe(
      catchError(this.handleError.handleError)
    );
  }

  getById(projectId: string): Observable<IProject> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    return this.http.get<IProject>(uri).pipe(
      catchError(this.handleError.handleError)
    );
  }

  search(term: string): Observable<IProject[]> {
    if (!term.trim()) {
      return of([]);
    }
    const uri = `${this.config.uri}/${this.domain}?name_like=${term}`;
    return this.http.get<IProject[]>(uri).pipe(
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

