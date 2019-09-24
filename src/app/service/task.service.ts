import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../domain';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class TaskService {

  private domain = 'tasks';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  add(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, { params: { taskListId: task.taskListId } })
      .pipe(concatMap(tasks => {
        const res = tasks.every(item => item.desc !== task.desc);
        if (!res) {
          throw "task exists"
        } else {
          return this.http.post<Task>(uri, JSON.stringify(task), { headers: this.headers });
        }
      }));
  }

  update(updateInfo, id): Observable<Task> {
    // const uri = `${this.config.uri}/${this.domain}/${id}`;
    // return this.http.patch<Task>(uri, JSON.stringify(updateInfo), { headers: this.headers });

    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.get<Task[]>(`${this.config.uri}/${this.domain}/`, { params: { 'taskListId': updateInfo.taskListId } })
      .pipe(concatMap(tasks => {
        const filterTasks = tasks.filter(task => task.id !== id);
        const isExist = filterTasks.every(task => task.desc !== updateInfo.desc);
        if (!isExist) {
          throw 'task exists';
        } else {
          return this.http.patch<Task>(uri, JSON.stringify(updateInfo), { headers: this.headers });
        }
      }));
  }

  delete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete<Task>(uri);
  }

  getByListId(listId): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, { params: { 'taskListId': listId } });
  }

  get(): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri);
  }

  getByDate(start, end): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}?endDate_gte=${start}&endDate_lte=${end}`;
    return this.http.get<Task[]>(uri);
  }


}
