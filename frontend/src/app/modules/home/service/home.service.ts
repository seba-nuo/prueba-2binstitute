import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/types/response';
import { environment } from 'src/enviroments/enviroments';

const authURL = `${environment.apiUrl}/auth`;
const userURL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  token = localStorage.getItem('token')
  headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
  constructor(private http: HttpClient) { }

  verifyToken() {
    return this.http.get<Response>(authURL, { headers: this.headers })
  }

  findAllUsers() {
    return this.http.get<Response>(userURL, { headers: this.headers })
  }
}
