import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, User } from '../domain';
import { Observable, from, of } from 'rxjs';
import { filter, reduce, map, mergeMap, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }
  searchUsers(filterUsername: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<User[]>(uri, { params: { 'email_like': filterUsername } });
  }
  getUserByProducts(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<User[]>(uri, { params: { 'projectId': projectId } });
  }
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    return this.http
      .patch<User>(uri, JSON.stringify({ projectIds: [...projectIds, projectId] }), { headers: this.headers })
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http
      .patch<User>(uri, JSON.stringify({ projectIds: toUpdate }), { headers: this.headers });
  }

  //   batchUpdateProjectRef(project: Project): Observable<User[]> {
  //     const projectId = project.id;
  //     const memberIds = project.members ? project.members : [];
  //     return from(memberIds).pipe(switchMap(id => {
  //       const uri = `${this.config.uri}/${this.domain}/${id}`;
  //       return this.http.get<User>(uri);
  //     })).pipe(filter(user => user.projectIds.indexOf(projectId) < 0))
  //     .pipe(switchMap(u => this.addProjectRef(u, projectId)))
  //     .pipe(reduce((users, curr) => [...users, curr], []));
  //   }
}
