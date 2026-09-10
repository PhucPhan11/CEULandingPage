import { Component, Input } from '@angular/core';
import { ContactContent, Language, SiteContent } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  @Input() site!: SiteContent;
  @Input() contact!: ContactContent;
  @Input() language: Language = 'vi';
}
