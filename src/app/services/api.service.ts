import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`login/`)
  }
  postUsers(userData:any){
    return this.http.post(`login/create/`,userData)
  }
}
