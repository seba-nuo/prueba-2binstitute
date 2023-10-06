import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroments';
import { Response } from 'src/app/types/response';

type User = Partial<{
  email: string | null;
  password: string | null;
  role: string | null;
}>
const baseURL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    return this.http.post<Response>(baseURL, user)
  }
}
