import { Component, Input } from '@angular/core';
import { Language, UpcomingEventContent } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-upcoming-event',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './upcoming-event.component.html',
})
export class UpcomingEventComponent {
  @Input() content!: UpcomingEventContent;
  @Input() language: Language = 'vi';
}
