import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LocalizedText, TeamData } from '../models/team-data';

@Injectable({
  providedIn: 'root',
})
export class TeamDataService {
  private readonly http = inject(HttpClient);

  load(): Observable<TeamData> {
    return this.http.get<unknown>('data/team-data.json').pipe(map((value) => this.validate(value)));
  }

  private validate(value: unknown): TeamData {
    if (!isRecord(value)) {
      throw new Error('Team data must be a JSON object.');
    }

    const requiredCollections = ['schedule', 'roster', 'results', 'events'] as const;
    for (const collection of requiredCollections) {
      if (!Array.isArray(value[collection])) {
        throw new Error(`Team data collection "${collection}" must be an array.`);
      }
    }

    if (
      !isRecord(value['site']) ||
      !isRecord(value['upcomingEvent']) ||
      !isRecord(value['recruitment']) ||
      !isRecord(value['contact'])
    ) {
      throw new Error('Team data is missing a required content group.');
    }

    const site = value['site'];
    if (
      typeof site['name'] !== 'string' ||
      !isLocalizedText(site['eyebrow']) ||
      !isLocalizedText(site['title']) ||
      !isLocalizedText(site['description']) ||
      !isLocalizedTextArray(site['introduction'])
    ) {
      throw new Error('Team site content is incomplete.');
    }

    const upcomingEvent = value['upcomingEvent'];
    const buttonLabel = upcomingEvent['buttonLabel'];
    const buttonUrl = upcomingEvent['buttonUrl'];

    if (
      !isLocalizedText(upcomingEvent['eyebrow']) ||
      !isLocalizedText(upcomingEvent['title']) ||
      !isLocalizedText(upcomingEvent['description']) ||
      typeof upcomingEvent['host'] !== 'string' ||
      !isLocalizedText(upcomingEvent['format']) ||
      !isLocalizedText(upcomingEvent['dateLabel']) ||
      !isLocalizedText(upcomingEvent['location'])
    ) {
      throw new Error('Upcoming event content is incomplete.');
    }

    if (
      (upcomingEvent['date'] !== undefined && typeof upcomingEvent['date'] !== 'string') ||
      (upcomingEvent['address'] !== undefined && !isLocalizedText(upcomingEvent['address']))
    ) {
      throw new Error('Upcoming event details are invalid.');
    }

    if ((buttonLabel === undefined) !== (buttonUrl === undefined)) {
      throw new Error('Upcoming event CTA must include both label and URL.');
    }

    if (
      (buttonLabel !== undefined && !isLocalizedText(buttonLabel)) ||
      (buttonUrl !== undefined && typeof buttonUrl !== 'string')
    ) {
      throw new Error('Upcoming event CTA is invalid.');
    }

    return value as unknown as TeamData;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isLocalizedText(value: unknown): value is LocalizedText {
  return isRecord(value) && typeof value['vi'] === 'string' && typeof value['en'] === 'string';
}

function isLocalizedTextArray(value: unknown): value is LocalizedText[] {
  return Array.isArray(value) && value.length > 0 && value.every(isLocalizedText);
}
