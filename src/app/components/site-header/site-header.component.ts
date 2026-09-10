import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Language } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  @Input() language: Language = 'vi';
  @Output() languageChange = new EventEmitter<Language>();

  protected selectLanguage(language: Language): void {
    this.languageChange.emit(language);
  }
}
