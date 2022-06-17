import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  list_departments = [
    {
      "state_name": "Atlantida"
    },
    {
      "state_name": "Choluteca"
    },
    {
      "state_name": "Colon"
    },
    {
      "state_name": "Comayagua"
    },
    {
      "state_name": "Copan"
    },
    {
      "state_name": "Cortes"
    },
    {
      "state_name": "El Paraiso"
    },
    {
      "state_name": "Francisco Morazan"
    },
    {
      "state_name": "Gracias a Dios"
    },
    {
      "state_name": "Intibuca"
    },
    {
      "state_name": "Islas de la Bahia"
    },
    {
      "state_name": "La Paz"
    },
    {
      "state_name": "Lempira"
    },
    {
      "state_name": "Ocotepeque"
    },
    {
      "state_name": "Olancho"
    },
    {
      "state_name": "Santa Barbara"
    },
    {
      "state_name": "Valle"
    },
    {
      "state_name": "Yoro"
    }
  ]

  constructor() { }

  getStates(): Observable<any> {
    return of({ data: this.list_departments })
  }
}
