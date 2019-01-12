import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, Tasklist } from '../domain';
import { Observable, from } from 'rxjs';
import { mergeMap, switchMap, concatMap } from 'rxjs/operators';


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

  add(task: Task, tasklistId): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, { params: { taskListId: tasklistId } })
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
    const uri = `${this.config.uri}/${this.domain}/${id}`;
    return this.http.patch<Task>(uri, JSON.stringify(updateInfo), { headers: this.headers });
  }
  // update(updateInfo, id): Observable<Task> {
  //   const uri = `${this.config.uri}/${this.domain}/${id}`;
  //   return this.http.get<Task[]>(`${this.config.uri}/${this.domain}/`, { params: { 'desc': updateInfo.desc } })
  //     .pipe(switchMap(res => {
  //       if (res.length !== 0) {
  //         throw 'task exists';
  //       } else {
  //         return this.http.patch<Task>(uri, JSON.stringify(updateInfo), { headers: this.headers });
  //       }
  //     }));
  // }

  delete(task: Task): Observable<Task> {
    const uri = `${this.config.uri}/${this.domain}/${task.id}`;
    return this.http.delete<Task>(uri);
  }

  getByListId(listId): Observable<Task[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Task[]>(uri, { params: { 'taskListId': listId } });
  }

  // get(taskId): Observable<Task> {
  //   const uri = `${this.config.uri}/${this.domain}`;
  //   return this.http.get<Task>(uri, { params: taskId });
  // }

  // getByLists(lists: Tasklist[]): Observable<Task[]> {
  //   return from(lists)
  //     .pipe(mergeMap(list => this.get(list.id)))
  //     .pipe(reduce((tasks: Task[], t: Task[]) => [...tasks, ...t], []));
  // }
  // move(taskId: string, tasklistId: string): Observable<Task> {
  //   const uri = `${this.config.uri}/${this.domain}/${taskId}`;
  //   return this.http.patch<Task>(uri, JSON.stringify({ taskListId: tasklistId }), { headers: this.headers });
  // }
  // moveAll(fromListId: string, toListId: string): Observable<Task[]> {
  //   return this.get(fromListId)
  //     .pipe(mergeMap(tasks => from(tasks)))
  //     .pipe(mergeMap(task => this.move(task.id, toListId)))
  //     .reduce((arr, x) => [...arr, x], []);
  // }
}
