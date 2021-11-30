import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url = 'http://localhost:9090/api/users';
  constructor(public http: HttpClient) {}

  addUser = (user: Object): Observable<any> => {
    return this.http.post(`${this.url}/signUp`, user);
  };

  editUser = (user: Object): Observable<any> => {
    return this.http.put(`${this.url}/updateUser`, user);
  };

  getUsers = (): Observable<any> => {
    return this.http.get(`${this.url}/getUsers`);
  };

  deleteUser = (user: Object): Observable<any> => {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        ...user,
      },
    };
    return this.http.delete(`${this.url}/removeUser`, options);
  };
}
