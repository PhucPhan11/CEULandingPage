import { Pipe, PipeTransform } from '@angular/core';
import { Language, LocalizedText } from '../models/team-data';

@Pipe({
  name: 'localized',
  standalone: true,
})
export class LocalizedTextPipe implements PipeTransform {
  transform(value: LocalizedText | null | undefined, language: Language): string {
    if (!value) {
      return '';
    }

    return value[language] || value.vi || value.en;
  }
}
