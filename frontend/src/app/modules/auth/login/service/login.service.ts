import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/types/response';
import { environment } from 'src/enviroments/enviroments';

const baseURL = `${environment.apiUrl}/auth`;
type User = Partial<{
  email: string | null;
  password: string | null;
  role: string | null;
}>

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<Response>(`${baseURL}/login`, user)
  }
}
