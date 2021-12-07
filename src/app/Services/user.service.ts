import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ApiServer = environment.basedApiServer;
  constructor(private http: HttpClient) { }

  public RegisterUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.ApiServer}/api/User`, user);
  }
  public LoginUser(user: Login): Observable<Login> {
    return this.http.post<Login>(`${this.ApiServer}/api/login`, user);
  }
  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.ApiServer}/api/register`, user);
  }
}
