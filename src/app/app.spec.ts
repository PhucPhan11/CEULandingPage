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

    const englishButton = compiled.querySelector('button:last-of-type') as HTMLButtonElement;
    englishButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('#hero-title')?.textContent).toContain('Throw together');
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
    sampleNotice: { vi: 'Mẫu', en: 'Sample' },
    stats: [],
    values: [],
  },
  schedule: [],
  roster: [],
  results: [],
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
