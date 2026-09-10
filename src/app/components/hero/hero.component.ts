import { Component, Input } from '@angular/core';
import { Language, SiteContent } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  @Input() site!: SiteContent;
  @Input() language: Language = 'vi';
}
