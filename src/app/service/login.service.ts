import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getJwt(username: string, password: string) {


    return this.httpClient.post(this.apiUrl + "login_check", {username: username, password: password})
      .pipe(data => {
        return data

      });
  }

  getUser(token) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + token)
    return this.httpClient.get(this.apiUrl + "user",{headers})
      .pipe(data => {
        return data
      });
  }
}
