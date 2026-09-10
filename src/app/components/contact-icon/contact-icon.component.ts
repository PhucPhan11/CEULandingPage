import { Component, Input } from '@angular/core';
import { ContactIcon } from '../../models/team-data';

@Component({
  selector: 'app-contact-icon',
  standalone: true,
  templateUrl: './contact-icon.component.html',
})
export class ContactIconComponent {
  @Input() kind: ContactIcon = 'email';
}
