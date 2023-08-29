import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private themeService: ThemeService, private renderer: Renderer2) {
    const theme = themeService.getStoredTheme();

    this.renderer.setAttribute(
      document.querySelector('html'),
      'data-bs-theme',
      theme
    );
  }
}
