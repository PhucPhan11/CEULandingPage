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
    expect(compiled.querySelector('#hero-title')?.textContent).toContain('Ném đĩa');
    expect(compiled.querySelector('.about-statement-copy')?.textContent).toContain('Cộng đồng Cơ Đốc');
    expect(compiled.querySelector('#mission-title')?.textContent).toContain('Gây dựng');
    expect(compiled.querySelector('.event-card h3')?.textContent).toContain('Giao hữu CEU');

    const englishButton = compiled.querySelector('button:last-of-type') as HTMLButtonElement;
    englishButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('#hero-title')?.textContent).toContain('Throw together');
    expect(compiled.querySelector('.about-statement-copy')?.textContent).toContain('A Christian community');
    expect(compiled.querySelector('#mission-title')?.textContent).toContain('Build. Train. Share.');
    expect(compiled.querySelector('.event-card h3')?.textContent).toContain('CEU friendly match');
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
