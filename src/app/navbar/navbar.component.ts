import { ThemeService } from './../theme.service';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  theme: string;
  constructor(private renderer: Renderer2, private themeService: ThemeService) {
    this.theme = themeService.getStoredTheme();
  }

  setMode() {
    this.theme = this.themeService.toggleTheme();
    this.renderer.setAttribute(
      document.querySelector('html'),
      'data-bs-theme',
      this.theme
    );
  }
}
