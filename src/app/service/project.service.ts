import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, Tasklist } from '../domain';
import { Observable, from } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
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

  // before add, check if project exists
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Project[]>(uri, { params: { 'name': project.name } })
      .pipe(switchMap(res => {
        if (res.length !== 0) {
          throw 'project exist';
        } else {
          return this.http.post<Project>(uri, JSON.stringify(project), { headers: this.headers });
        }
      }));
  }

  update(updateInfo, id): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.get<Project[]>(`${this.config.uri}/${this.domain}`, { params: { 'name': updateInfo.name } })
      .pipe(switchMap(res => {
        if (res.length !== 0) {
          throw 'project exist';
        } else {
          return this.http.patch<Project>(uri, JSON.stringify(updateInfo), { headers: this.headers });
        }
      }));
  }

  delete(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    this.http.get<Tasklist[]>(`${this.config.uri}/tasklists/`, { params: { 'projectId': project.id } })
      .subscribe(tasklists => tasklists.forEach(tasklist => this.tasklistService$.delete(tasklist).subscribe()));
    return this.http.delete<Project>(uri);
  }

  get(): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Project[]>(uri);
  }

  // getById(id): Observable<Project> {
  //   const uri = `${this.config.uri}/${this.domain}/${id}`;
  //   return this.http.get<Project>(uri);
  // }
}
