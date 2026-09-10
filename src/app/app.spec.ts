import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TeamData } from './models/team-data';
import { App } from './app';

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    http.expectOne('data/team-data.json').flush(sampleTeamData);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the loaded team title and switch language', async () => {
    const fixture = TestBed.createComponent(App);
    http.expectOne('data/team-data.json').flush(sampleTeamData);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.site-header .brand-copy')?.textContent).toContain(
      'CAN THO ENTIXIE',
    );
    expect(compiled.querySelector('#hero-title')?.textContent).toContain('Ném đĩa');
    expect(compiled.querySelector('.about-statement-copy')?.textContent).toContain('Cộng đồng Cơ Đốc');
    expect(compiled.querySelector('#mission-title')?.textContent).toContain('Gây dựng');
    const eventCards = compiled.querySelectorAll('.event-card');
    expect(eventCards).toHaveLength(4);
    expect(eventCards[0].textContent).toContain('THAM GIA SEACUP5');
    expect(eventCards[1].textContent).toContain('LOI CHOI RUN');
    expect(eventCards[2].textContent).toContain('Giải Southwest Hat');
    expect(eventCards[3].textContent).toContain('Giao hữu CEU');
    const southwestCard = eventCards[2] as HTMLElement;
    expect(southwestCard.querySelector('.event-background')).toBeTruthy();
    expect(southwestCard.querySelectorAll('.event-gallery > .event-image')).toHaveLength(2);
    expect(southwestCard.querySelector('.event-background img')?.getAttribute('src'))
      .toBe('ceu-img/events/southwest-hat-2024-background.png');
    expect(southwestCard.querySelector('.event-feature-logo img')?.getAttribute('src'))
      .toBe('ceu-img/events/southwest-hat-2024-logo.png');
    expect(compiled.querySelector('img[alt="Ảnh giải đấu"]')?.getAttribute('src'))
      .toBe('ceu-img/events/southwest-hat-2024-match.png');
    const loiChoiCard = eventCards[1] as HTMLElement;
    expect(loiChoiCard.querySelectorAll('time')).toHaveLength(2);
    expect(loiChoiCard.querySelector('time')?.getAttribute('datetime')).toBe('2026-07-15');
    expect(loiChoiCard.querySelectorAll('time')[1].getAttribute('datetime')).toBe('2026-08-09');
    expect(loiChoiCard.querySelectorAll('.event-image-contain')).toHaveLength(4);
    expect(loiChoiCard.querySelectorAll('img')[3].getAttribute('src'))
      .toBe('ceu-img/events/loi-choi-run-04.png');
    const seacupCard = eventCards[0] as HTMLElement;
    expect(seacupCard.textContent).toContain('NTSEA Ultimate Club');
    expect(seacupCard.querySelector('.event-host img')?.getAttribute('src'))
      .toBe('ceu-img/events/seacup5-ntsea-logo.png');
    expect(seacupCard.querySelector('.event-feature-logo img')?.getAttribute('src'))
      .toBe('ceu-img/events/seacup5-event-logo.png');
    expect(seacupCard.querySelectorAll('.event-image-contain')).toHaveLength(2);
    expect(seacupCard.querySelectorAll('img')[3].getAttribute('src'))
      .toBe('ceu-img/events/seacup5-team-photo-02.jpg');

    const englishButton = compiled.querySelector('button:last-of-type') as HTMLButtonElement;
    englishButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('#hero-title')?.textContent).toContain('Throw together');
    expect(compiled.querySelector('.about-statement-copy')?.textContent).toContain('A Christian community');
    expect(compiled.querySelector('#mission-title')?.textContent).toContain('Build. Train. Share.');
    expect(eventCards[3].querySelector('h3')?.textContent).toContain('CEU friendly match');
    expect(compiled.querySelectorAll('.event-feature-logo')).toHaveLength(2);
    expect(compiled.textContent).toContain('Southwest Hat tournament');
    expect(compiled.textContent).toContain('LOI CHOI RUN');
    expect(compiled.textContent).toContain('PARTICIPATING IN SEACUP5');
  });
});

const sampleTeamData: TeamData = {
  site: {
    name: 'CanTho Entixie Ultimate',
    shortName: 'ENTIXIE',
    location: { vi: 'Cần Thơ', en: 'Can Tho' },
    eyebrow: { vi: 'Ultimate tại Cần Thơ', en: 'Ultimate in Can Tho' },
    title: { vi: 'Ném đĩa', en: 'Throw together' },
    description: { vi: 'Mô tả', en: 'Description' },
    introduction: [
      { vi: 'Giới thiệu CEU', en: 'CEU introduction' },
      { vi: 'Cộng đồng Cơ Đốc', en: 'A Christian community' },
    ],
    sampleNotice: { vi: 'Mẫu', en: 'Sample' },
    stats: [],
    values: [
      {
        icon: '✦',
        title: { vi: 'Gây dựng tình thân', en: 'Building camaraderie' },
        description: { vi: 'Kết nối', en: 'Connect' },
      },
    ],
  },
  schedule: [],
  roster: [],
  results: [],
  events: [
    {
      id: 'event-1',
      date: '2024-02-24',
      dateLabel: { vi: '24/02/2024', en: 'February 24, 2024' },
      title: { vi: 'Giao hữu CEU', en: 'CEU friendly match' },
      opponent: 'Thu Duc Entixie Ultimate',
      opponentLogo: 'ceu-img/events/thuduc-logo.png',
      images: [
        {
          src: 'ceu-img/events/thuduc-match-01.png',
          alt: { vi: 'Ảnh giao hữu', en: 'Friendly match photo' },
        },
      ],
    },
    {
      id: 'event-2',
      date: '2024-04-27',
      dateLabel: { vi: '27/04/2024', en: 'April 27, 2024' },
      title: { vi: 'Giải Southwest Hat', en: 'Southwest Hat tournament' },
      eventLogo: 'ceu-img/events/southwest-hat-2024-logo.png',
      background: 'ceu-img/events/southwest-hat-2024-background.png',
      images: [
        {
          src: 'ceu-img/events/southwest-hat-2024-match.png',
          alt: { vi: 'Ảnh giải đấu', en: 'Tournament photo' },
        },
      ],
    },
    {
      id: 'event-3',
      date: '2026-07-15',
      endDate: '2026-08-09',
      dateLabel: { vi: '15/07/2026', en: 'July 15, 2026' },
      endDateLabel: { vi: '09/08/2026', en: 'August 9, 2026' },
      title: { vi: 'LOI CHOI RUN', en: 'LOI CHOI RUN' },
      images: [
        {
          src: 'ceu-img/events/loi-choi-run-01.png',
          fit: 'contain',
          alt: {
            vi: 'Ảnh 1 LOI CHOI RUN',
            en: 'LOI CHOI RUN photo 1',
          },
        },
        {
          src: 'ceu-img/events/loi-choi-run-02.png',
          fit: 'contain',
          alt: {
            vi: 'Ảnh 2 LOI CHOI RUN',
            en: 'LOI CHOI RUN photo 2',
          },
        },
        {
          src: 'ceu-img/events/loi-choi-run-03.png',
          fit: 'contain',
          alt: {
            vi: 'Ảnh 3 LOI CHOI RUN',
            en: 'LOI CHOI RUN photo 3',
          },
        },
        {
          src: 'ceu-img/events/loi-choi-run-04.png',
          fit: 'contain',
          alt: {
            vi: 'Ảnh 4 LOI CHOI RUN',
            en: 'LOI CHOI RUN photo 4',
          },
        },
      ],
    },
    {
      id: 'event-4',
      date: '2026-08-29',
      dateLabel: { vi: '29/08/2026', en: 'August 29, 2026' },
      title: { vi: 'THAM GIA SEACUP5', en: 'PARTICIPATING IN SEACUP5' },
      host: 'NTSEA Ultimate Club',
      hostLogo: 'ceu-img/events/seacup5-ntsea-logo.png',
      eventLogo: 'ceu-img/events/seacup5-event-logo.png',
      images: [
        {
          src: 'ceu-img/events/seacup5-team-photo-01.png',
          fit: 'contain',
          alt: {
            vi: 'Đội CEU tham gia SEACUP5 cùng các đội Ultimate',
            en: 'The CEU team at SEACUP5 with fellow Ultimate teams',
          },
        },
        {
          src: 'ceu-img/events/seacup5-team-photo-02.jpg',
          fit: 'contain',
          alt: {
            vi: 'Đội hình CEU tại SEACUP5',
            en: 'The CEU squad at SEACUP5',
          },
        },
      ],
    },
  ],
  recruitment: {
    eyebrow: { vi: 'Tham gia', en: 'Join' },
    title: { vi: 'Tiêu đề', en: 'Title' },
    description: { vi: 'Mô tả', en: 'Description' },
    buttonLabel: { vi: 'Liên hệ', en: 'Contact' },
    buttonUrl: 'mailto:test@example.com',
    details: [],
  },
  contact: {
    email: 'test@example.com',
    location: { vi: 'Cần Thơ', en: 'Can Tho' },
    socials: [],
  },
};
