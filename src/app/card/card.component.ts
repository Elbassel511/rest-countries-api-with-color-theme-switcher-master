import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../modals/country.modal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input('country') country!: Country;
  @Output('click') click = new EventEmitter();

  navigateToDetials(country: Country) {
    this.click.emit(country);
  }
}
