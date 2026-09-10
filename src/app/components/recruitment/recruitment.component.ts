import { Component, Input } from '@angular/core';
import { Language, RecruitmentContent } from '../../models/team-data';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './recruitment.component.html',
})
export class RecruitmentComponent {
  @Input() content!: RecruitmentContent;
  @Input() language: Language = 'vi';
}
