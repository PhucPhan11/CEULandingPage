import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Language } from '../../models/team-data';
import { TEAM_BRAND_ASSETS } from '../../shared/brand-assets';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  protected readonly brandAssets = TEAM_BRAND_ASSETS;
  @Input() language: Language = 'vi';
  @Output() languageChange = new EventEmitter<Language>();

  protected selectLanguage(language: Language): void {
    this.languageChange.emit(language);
  }
}
