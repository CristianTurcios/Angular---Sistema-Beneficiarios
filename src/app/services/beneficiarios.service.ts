import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {

  constructor(
    private http: HttpClient,
  ) {}

  get(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beneficiarios?page=${page}&size=${size}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beneficiarios/${id}`);
  }

  post(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/beneficiarios`, data);
  }

  put(id: number, data): Observable<any> {
    return this.http.put(`${environment.apiUrl}/beneficiarios/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/beneficiarios/${id}`,);
  }

  search(searchTerm: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beneficiarios?id=${searchTerm}`);
  }
  
  report(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beneficiarios/report`);
  }
}
