import { Component, Input } from '@angular/core';
import { Language, RecentEvent } from '../../models/team-data';
import { TEAM_BRAND_ASSETS } from '../../shared/brand-assets';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-recent-events',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './recent-events.component.html',
})
export class RecentEventsComponent {
  protected readonly brandAssets = TEAM_BRAND_ASSETS;

  @Input() events: RecentEvent[] = [];
  @Input() language: Language = 'vi';
}
