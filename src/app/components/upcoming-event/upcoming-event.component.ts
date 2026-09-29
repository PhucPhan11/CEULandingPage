import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  inject,
  signal,
} from '@angular/core';
import { Language, UpcomingEventContent } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

interface DateTile {
  month: string;
  year: string;
}

@Component({
  selector: 'app-upcoming-event',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './upcoming-event.component.html',
})
export class UpcomingEventComponent implements AfterViewInit {
  @Input() content!: UpcomingEventContent;
  @Input() language: Language = 'vi';

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  /** Content stays visible unless the browser can animate it in. */
  protected readonly revealState = signal<'static' | 'pending' | 'revealed'>('static');

  ngAfterViewInit(): void {
    this.armReveal();
  }

  /** Month/year for the decorative calendar tile: the ISO `date` wins, else "M/YYYY" in the label. */
  protected get dateTile(): DateTile | null {
    const iso = this.content.date?.match(/^(\d{4})-(\d{2})/);
    if (iso) {
      return { month: String(Number(iso[2])), year: iso[1] };
    }

    const label = this.content.dateLabel.vi.match(/(\d{1,2})\/(\d{4})/);
    return label ? { month: String(Number(label[1])), year: label[2] } : null;
  }

  private armReveal(): void {
    const section = this.host.nativeElement.querySelector('.upcoming-event-section');
    if (
      !section ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    this.revealState.set('pending');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.revealState.set('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
