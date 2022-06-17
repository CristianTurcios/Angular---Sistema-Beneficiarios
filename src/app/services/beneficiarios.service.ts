import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {

  constructor(
    private http: HttpClient,
  ) {}

  get(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beneficiarios`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/beneficiarios/${id}`);
  }

  post(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/beneficiarios`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/beneficiarios/${id}`,);
  }
}
