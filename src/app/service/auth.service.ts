import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, User, Auth } from '../domain';
import { Observable, from } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private domain = 'users';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  constructor(private http: HttpClient, @Inject('BASE_CONFIG') private config) { }

  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Auth>(uri, { params: { 'email': user.email } })
      .pipe(switchMap(
        res => {
          if (res.length > 0) {
            throw 'user existed';
          }
          return this.http.post<Auth>(uri, JSON.stringify(user), { headers: this.headers });
        }
      ));
  }

  login(username: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http.get<Auth>(uri, { params: { 'email': username, 'password': password } });
  }

}
