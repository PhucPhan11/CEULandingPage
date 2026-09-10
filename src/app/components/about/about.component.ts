import { Component, Input } from '@angular/core';
import { Language, SiteContent } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  @Input() site!: SiteContent;
  @Input() language: Language = 'vi';
}
