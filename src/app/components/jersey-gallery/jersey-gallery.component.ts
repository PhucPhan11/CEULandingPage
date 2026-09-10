import { Component, Input } from '@angular/core';
import { Language, LocalizedText } from '../../models/team-data';
import { TEAM_BRAND_ASSETS } from '../../shared/brand-assets';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

interface JerseyCard {
  id: string;
  image: string;
  title: LocalizedText;
  detail: LocalizedText;
}

@Component({
  selector: 'app-jersey-gallery',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './jersey-gallery.component.html',
})
export class JerseyGalleryComponent {
  @Input() language: Language = 'vi';

  protected readonly jerseyCards: JerseyCard[] = [
    {
      id: 'black',
      image: TEAM_BRAND_ASSETS.jerseys.black,
      title: { vi: 'Phiên bản đen', en: 'Black edition' },
      detail: { vi: 'Nền đen, đường nét vàng', en: 'Black base, golden linework' },
    },
    {
      id: 'black-and-yellow',
      image: TEAM_BRAND_ASSETS.jerseys.blackAndYellow,
      title: { vi: 'Bộ phối màu', en: 'Mixed set' },
      detail: { vi: 'Hai màu, một tinh thần', en: 'Two colors, one spirit' },
    },
    {
      id: 'yellow',
      image: TEAM_BRAND_ASSETS.jerseys.yellow,
      title: { vi: 'Phiên bản vàng', en: 'Yellow edition' },
      detail: { vi: 'Năng lượng vàng cam', en: 'Golden-orange energy' },
    },
  ];
}
