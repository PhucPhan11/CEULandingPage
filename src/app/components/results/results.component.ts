import { Component, Input } from '@angular/core';
import { Language, MatchResult, ResultOutcome } from '../../models/team-data';
import { RESULT_OUTCOME_LABELS, resultSymbol } from '../../shared/content-labels';
import { LocalizedTextPipe } from '../../shared/localized-text.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [LocalizedTextPipe],
  templateUrl: './results.component.html',
})
export class ResultsComponent {
  @Input() results: MatchResult[] = [];
  @Input() language: Language = 'vi';

  protected outcomeLabel(outcome: ResultOutcome) {
    return RESULT_OUTCOME_LABELS[outcome];
  }

  protected outcomeSymbol(outcome: ResultOutcome): string {
    return resultSymbol(outcome);
  }
}
