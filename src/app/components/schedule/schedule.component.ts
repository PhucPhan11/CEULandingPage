import { Component, Input } from '@angular/core';
import { Language, ScheduleItem, ScheduleKind } from '../../models/team-data';
import { SCHEDULE_KIND_LABELS } from '../../shared/content-labels';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent {
  @Input() items: ScheduleItem[] = [];
  @Input() language: Language = 'vi';

  protected scheduleLabel(kind: ScheduleKind) {
    return SCHEDULE_KIND_LABELS[kind];
  }
}
