import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { TeamDataService } from './services/team-data.service';
import { Language, LocalizedText, ResultOutcome, ScheduleKind, TeamData } from './models/team-data';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
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

  protected text(value: LocalizedText): string {
    return value[this.language()] || value.vi || value.en;
  }

  protected setLanguage(language: Language): void {
    this.language.set(language);
    this.document.documentElement.lang = language;
  }

  protected scheduleLabel(kind: ScheduleKind): string {
    const labels: Record<ScheduleKind, LocalizedText> = {
      practice: { vi: 'Tập luyện', en: 'Practice' },
      match: { vi: 'Thi đấu', en: 'Match' },
    };

    return this.text(labels[kind]);
  }

  protected outcomeLabel(outcome: ResultOutcome): string {
    const labels: Record<ResultOutcome, LocalizedText> = {
      win: { vi: 'Thắng', en: 'Win' },
      loss: { vi: 'Thua', en: 'Loss' },
      draw: { vi: 'Hòa', en: 'Draw' },
    };

    return this.text(labels[outcome]);
  }

  protected outcomeSymbol(outcome: ResultOutcome): string {
    return outcome === 'win' ? 'W' : outcome === 'loss' ? 'L' : 'D';
  }

  protected scrollTo(event: Event, target: string): void {
    event.preventDefault();
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
