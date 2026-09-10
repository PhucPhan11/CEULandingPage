import { Component, Input } from '@angular/core';
import { Language, SiteContent } from '../../models/team-data';
import { TEAM_BRAND_ASSETS } from '../../shared/brand-assets';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  protected readonly brandAssets = TEAM_BRAND_ASSETS;
  @Input() site!: SiteContent;
  @Input() language: Language = 'vi';
}
