import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BecasService {

  constructor(
    private http: HttpClient,

  ) { }

  get(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${environment.apiUrl}/becas?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/becas/${id}`);
  }

  post(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/becas`, data);
  }

  put(id: number, data): Observable<any> {
    return this.http.put(`${environment.apiUrl}/becas/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/becas/${id}`,);
  }

  search(searchTerm: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/becas?id=${searchTerm}`);
  }

  report(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/becas/report`);
  }
}
