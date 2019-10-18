import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../domain';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }
  searchUsers(filterUsername: string): Observable<IUser[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<IUser[]>(uri, { params: { 'email_like': filterUsername } });
  }
  getUserByProducts(projectId: string): Observable<IUser[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<IUser[]>(uri, { params: { 'projectId': projectId } });
  }
  addProjectRef(user: IUser, projectId: string): Observable<IUser> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    return this.http
      .patch<IUser>(uri, JSON.stringify({ projectIds: [...projectIds, projectId] }), { headers: this.headers });
  }

  removeProjectRef(user: IUser, projectId: string): Observable<IUser> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http
      .patch<IUser>(uri, JSON.stringify({ projectIds: toUpdate }), { headers: this.headers });
  }
}
