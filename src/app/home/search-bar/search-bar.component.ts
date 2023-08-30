import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  @Output('valueChange') valueChange = new EventEmitter<string>();
  @Input('filter') selectedFilter = 'Filter br region';

  constructor(private router: Router) {}
  setFilter(r: string) {
    this.selectedFilter = r;
    this.router.navigate([''], { queryParams: { region: r } });
  }

  search(value: string) {
    this.valueChange.emit(value);
  }
}
