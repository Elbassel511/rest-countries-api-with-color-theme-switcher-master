import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  getStoredTheme() {
    return localStorage.getItem('theme') || 'light';
  }

  toggleTheme() {
    const theme = this.getStoredTheme() === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    return theme;
  }
}
