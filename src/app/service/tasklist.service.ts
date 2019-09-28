import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tasklist, Task } from '../domain';
import { Observable, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { HandleError } from './handleError.service';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class TasklistService {

  private domain = 'tasklists';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    @Inject('BASE_CONFIG') private config,
    private handleError: HandleError
  ) { }

  add(tasklist): Observable<Tasklist> {
    const uri = `${this.config.uri}/${this.domain}`;
    // return this.http.get<Tasklist[]>(`${this.config.uri}/projects/${projectId}/tasklists`)
    //   .pipe(concatMap(tasklists => {
    //     const res = tasklists.every(item => item.name !== tasklist.name);
    //     if (!res) {
    //       throw "tasklist exists"
    //     } else {
    //       return this.http.post<Tasklist>(uri, JSON.stringify(tasklist), { headers: this.headers });
    //     }
    //   }));
    return this.http.post<Tasklist>(uri, JSON.stringify(tasklist), { headers: this.headers });
  }

  update(updateInfo, tasklistId, projectId): Observable<Tasklist> {
    const uri = `${this.config.uri}/${this.domain}/${tasklistId}`;
    return this.http.get<Tasklist[]>(`${this.config.uri}/${this.domain}/`, { params: { 'projectId': projectId } })
      .pipe(concatMap(tasklists => {
        const filterLists = tasklists.filter(tasklist => tasklist.id !== tasklistId);
        const isExist = filterLists.every(list => list.name !== updateInfo.name);
        if (!isExist) {
          throw 'tasklist exists';
        } else {
          return this.http.patch<Tasklist>(uri, JSON.stringify(updateInfo), { headers: this.headers });
        }
      }));
  }

  getByProjectId(projectId): Observable<Tasklist[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Tasklist[]>(uri, { params: { 'projectId': projectId } });
  }
  getById(tasklistId): Observable<Tasklist> {
    const uri = `${this.config.uri}/${this.domain}/${tasklistId}`;
    return this.http.get<Tasklist>(uri);
  }
  delete(id): Observable<Tasklist> {
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    this.http.get<Task[]>(`${this.config.uri}/tasks/`, { params: { 'taskListId': id } })
      .subscribe(tasks => tasks.forEach(task => this.http.delete(`${this.config.uri}/tasks/${task.id}`).subscribe()));
    return this.http.delete<Tasklist>(uri);
  }
  get(): Observable<Tasklist[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Tasklist[]>(uri);
  }
  getLength(): Observable<number> {
    // const uri = `${this.config.uri}/${this.domain}?count=true`;
    // return this.http.get<number>(uri)
    //   .pipe(catchError(this.handleError.handleError));
    return (of(33));
  }
}

