import { Component, Input } from '@angular/core';
import { ContactIconComponent } from '../contact-icon/contact-icon.component';
import { ContactContent, Language, SiteContent } from '../../models/team-data';
import { TEAM_BRAND_ASSETS } from '../../shared/brand-assets';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [ContactIconComponent, LocalizedTextPipe],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  protected readonly brandAssets = TEAM_BRAND_ASSETS;
  @Input() site!: SiteContent;
  @Input() contact!: ContactContent;
  @Input() language: Language = 'vi';
}
