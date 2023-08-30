import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from './modals/country.modal';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

  getCountry(countryName: string): Observable<Country[]> {
    return this.http.get(
      'https://restcountries.com/v2/name/' + countryName
    ) as Observable<Country[]>;
  }

  getCountryByCode(code: string) {
    return this.http.get(
      'https://restcountries.com/v2/alpha/' + code
    ) as Observable<Country>;
  }
}
