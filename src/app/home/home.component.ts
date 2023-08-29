import { CountriesService } from './../countries.service';
import { Component } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Country } from '../modals/country.modal';
import { ActivatedRoute, Route, Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  countries$: Observable<Country[]>;
  filteredCountries$!: Observable<Country[]>;

  constructor(
    private countriesService: CountriesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.countries$ = countriesService.getAll() as Observable<any[]>;
    this.route.queryParams.subscribe((p: Params) => {
      let region = p['region'] || '';

      if (!region) {
        this.filteredCountries$ = this.countries$;
        return;
      }

      this.filteredCountries$ = this.countries$.pipe(
        map((countries) => {
          return countries.filter((c) => c.region === region);
        })
      );
    });
  }

  setFilter(r: string) {
    this.router.navigate([''], { queryParams: { region: r } });
  }

  countriesTrack(index: number, c: Country) {
    return c.name.common;
  }

  search(value: string) {
    this.filteredCountries$ = this.countries$.pipe(
      map((countries) => {
        return countries.filter((c) =>
          c.name.common.toLowerCase().includes(value.trim().toLowerCase())
        );
      })
    );
  }

  navigateToDetials(c: Country) {
    this.router.navigate(['country', c.name.common]);
  }
}