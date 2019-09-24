import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, Tasklist } from '../domain';
import { Observable, from, of } from 'rxjs';
import { mergeMap, switchMap, concatMap } from 'rxjs/operators';
import { TasklistService } from './tasklist.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private domain = 'projects';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config, private tasklistService$: TasklistService) { }

  // add a new project,backend check if project exists
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.post<Project>(uri, JSON.stringify(project), { headers: this.headers });
  }

  // update a project,backend check if updated project name exists
  update(updateInfo, id): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.put<Project>(uri, JSON.stringify(updateInfo), { headers: this.headers });
  }

  // when delete project,backend needs to delete all of related tasklists and tasks
  delete(id): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.delete<Project>(uri);
  }

  get(): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Project[]>(uri);
  }

  search(term): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}?name_like=${term}`;
    return this.http.get<Project[]>(uri);
  }
  getById(projectId): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${projectId}`;
    return this.http.get<Project>(uri);
  }
}
