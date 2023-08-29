import { CountriesService } from './../countries.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../modals/country.modal';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent {
  country$: Observable<Country>;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {
    let countryName = route.snapshot.paramMap.get('name') as string;
    this.country$ = countryService.getCountry(countryName);
  }
}
