import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { HeroComponent } from './components/hero/hero.component';
import { JerseyGalleryComponent } from './components/jersey-gallery/jersey-gallery.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { ResultsComponent } from './components/results/results.component';
import { RosterComponent } from './components/roster/roster.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { Language, TeamData } from './models/team-data';
import { TeamDataService } from './services/team-data.service';

@Component({
  imports: [
    AboutComponent,
    HeroComponent,
    JerseyGalleryComponent,
    RecruitmentComponent,
    ResultsComponent,
    RosterComponent,
    ScheduleComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly dataService = inject(TeamDataService);
  private readonly document = inject(DOCUMENT);

  protected readonly language = signal<Language>('vi');
  protected readonly data = signal<TeamData | null>(null);
  protected readonly dataState = signal<'loading' | 'ready' | 'error'>('loading');
  protected readonly dataError = signal('Unable to load team content.');

  constructor() {
    this.loadData();
  }

  protected setLanguage(language: Language): void {
    this.language.set(language);
    this.document.documentElement.lang = language;
  }

  private loadData(): void {
    this.dataService.load().subscribe({
      next: (data) => {
        this.data.set(data);
        this.dataState.set('ready');
      },
      error: (error: unknown) => {
        console.error('Team data could not be loaded.', error);
        this.dataError.set(
          this.language() === 'vi'
            ? 'Không thể tải dữ liệu đội lúc này. Vui lòng thử lại sau.'
            : 'Team data is unavailable right now. Please try again later.',
        );
        this.dataState.set('error');
      },
    });
  }
}
