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

  get(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/becas`);
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
}
