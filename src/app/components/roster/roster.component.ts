import { Component, Input } from '@angular/core';
import { Language, RosterMember } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './roster.component.html',
})
export class RosterComponent {
  @Input() members: RosterMember[] = [];
  @Input() language: Language = 'vi';
}
