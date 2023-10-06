import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get(authURL, { headers: this.headers })
  }

  findAllUsers() {
    return this.http.get(userURL, { headers: this.headers })
  }
}
