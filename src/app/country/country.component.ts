import { CountriesService } from './../countries.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable, map, switchMap, take } from 'rxjs';
import { Country } from '../modals/country.modal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country$: Observable<Country[]>;
  bordersCountries$: Observable<string[]>;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService,
    private location: Location
  ) {
    // let countryName = route.snapshot.paramMap.get('name') as string;
    let countryName;
    this.country$ = route.paramMap.pipe(
      switchMap((p) => {
        countryName = p.get('name') as string;
        return countryService.getCountry(countryName) as Observable<Country[]>;
      })
    );

    this.bordersCountries$ = this.country$.pipe(
      map((c: Country[]) => {
        let country = c[0];
        let bordersCountries: string[] = [];
        country.borders.map((c) => {
          this.countryService
            .getCountryByCode(c)
            .pipe(take(1))
            .subscribe((c: Country) => {
              bordersCountries.push(c.name as unknown as string);
            });
        });
        return bordersCountries;
      })
    );
  }

  goBack() {
    this.location.back();
  }
}
