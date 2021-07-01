import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant, SERVER_URL } from '@modules/constant';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {
        this.user = {
            id: '123',
            name: 'Admin',
            email: 'no-reply@admintest.com',
            password: 'admin'
        };
    }

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }

    private baseUrl =  constant.ServerPath;

    getList(page: number, perpage: number): Observable<any> {
      return this.http.get(this.baseUrl + SERVER_URL.USER + '?page=' + page + '&size=' + perpage + '&sort=updateTime,desc');
    }

    getListByCompany(page: number, perpage: number, com: number): Observable<any> {
      return this.http.get(this.baseUrl + SERVER_URL.COMPANY + '/' + com +  SERVER_URL.USER
        + '?page=' + page + '&size=' + perpage + '&sort=updateTime,desc');
    }

    addUser(user: Object): Observable<any> {
      return this.http.post(this.baseUrl + SERVER_URL.USER , user);
    }

    getUser( user: any): Observable<any> {
      return this.http.get(this.baseUrl + SERVER_URL.USER + '/' + user);
    }

    deleteUserold(cid: number): Observable<any> {
      return this.http.delete(this.baseUrl + SERVER_URL.USER + '/' + cid);
    }

    deleteUser(data: Object): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: data
      };
      return this.http.delete(this.baseUrl + SERVER_URL.USER , httpOptions);
    }

    editUser(user: Object, cid: number): Observable<any> {
      return this.http.patch(this.baseUrl + SERVER_URL.USER + '/' + cid, user);
    }

    getRole(): Observable<any> {
      return this.http.get(this.baseUrl + SERVER_URL.ROLE);
    }
}
