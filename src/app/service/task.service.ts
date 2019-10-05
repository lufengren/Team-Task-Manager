import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../domain';
import { Observable, of } from 'rxjs';
import { HandleError } from './handleError.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient,
    @Inject('BASE_CONFIG') private config,
    private handleError: HandleError
  ) { }

  add(task, tasklistId, projectId): Observable<Task> {
    const uri = `${this.config.uri}/projects/${projectId}/tasklists/${tasklistId}/${this.domain}`;
    return this.http.post<Task>(uri, JSON.stringify(task), { headers: this.headers });
  }

  update(updateInfo: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${updateInfo.id}`;
    return this.http.put<Task>(uri, updateInfo, { headers: this.headers });
  }

  delete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete<Task>(uri);
  }

  getByListId(listId): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, { params: { 'taskListId': listId } });
  }

  getByProjectId(projectId): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, { params: { 'projectId': projectId } });
  }

  get(): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri);
  }

  getByDate(start, end): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}?endDate_gte=${start}&endDate_lte=${end}`;
    return this.http.get<Task[]>(uri);
  }
  getLength(): Observable<number> {
    // const uri = `${this.config.uri}/${this.domain}?count=true`;
    // return this.http.get<number>(uri)
    //   .pipe(catchError(this.handleError.handleError));
    return (of(52));
  }

}
