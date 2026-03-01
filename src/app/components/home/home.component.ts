import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WhyUsComponent } from '../why-us/why-us.component';
import { MissionComponent } from '../mission/mission.component';
import { ServicesComponent } from '../services/services.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ContactComponent } from '../contact/contact.component';
import { fadeUp } from '../../shared/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    WhyUsComponent,
    MissionComponent,
    ServicesComponent,
    TestimonialsComponent,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeUp]
})
export class HomeComponent implements OnInit {
  badgeTexts = [
    'Trusted by B2B Leaders Worldwide',
    '500+ Clients Scaled Successfully',
    '3x More Qualified Meetings',
    '98% Email Deliverability Rate'
  ];
  badgeIndex = 0;
  badgeVisible = true;
  private badgeInterval: any;

  stats = [
    { value: 100, display: '100', suffix: 'x', label: 'More Qualified Meetings', current: 100 },
    { value: 100, display: '100', suffix: '%', label: 'Email Deliverability', current: 100 },
    { value: 100, display: '100', suffix: '+', label: 'B2B Clients Served', current: 100 }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startBadgeRotation();
  }

  startBadgeRotation(): void {
    this.badgeInterval = setInterval(() => {
      this.badgeVisible = false;
      setTimeout(() => {
        this.badgeIndex = (this.badgeIndex + 1) % this.badgeTexts.length;
        this.badgeVisible = true;
      }, 3500);
    }, 3500);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
