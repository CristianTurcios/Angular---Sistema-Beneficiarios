import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  get(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  search(searchTerm: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users?email=${searchTerm}`);
  }
}
