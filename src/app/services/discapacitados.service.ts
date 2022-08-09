import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscapacitadosService {

  constructor(
    private http: HttpClient,
  ) {}

  get(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/discapacitados`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/discapacitados/${id}`);
  }

  post(data): Observable<any> {
    return this.http.post(`${environment.apiUrl}/discapacitados`, data);
  }

  put(id: number, data): Observable<any> {
    return this.http.put(`${environment.apiUrl}/discapacitados/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/discapacitados/${id}`,);
  }
}
