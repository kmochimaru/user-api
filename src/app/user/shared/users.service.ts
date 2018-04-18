import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

import { User } from './user';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


const API_URL = `${environment.apiUrl}/api/users`;

@Injectable()
export class UsersService {

  user: User;

  constructor(private _http: HttpClient, private _toastrService: ToastrService) { }

  public create(user: User): Observable<User[]> {
    return this._http.post(API_URL, user)
      .catch(this.handleError);
  }

  public delete(id: number): Observable<User[]> {
    return this._http.delete(API_URL + `/${id}`)
      .catch(this.handleError);
  }

  public findAll(): Observable<User[]> {
    return this._http.get<User[]>(API_URL + '/all')
      .catch(this.handleError);
  }

  public findBydId(id: number): Observable<User[]> {
    return this._http.get<User>(API_URL + `/${id}`)
      .catch(this.handleError);
  }

  public update(user: User) {
    return this._http.put(API_URL, user)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('Api UsersService :: handleError', error);
    return Observable.throw(error);
  }
}