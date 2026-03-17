import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listStagger, sectionFade } from '../../shared/animations';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
  animations: [listStagger, sectionFade]
})
export class TestimonialsComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  testimonials = [
    {
      tag: 'Unmatched Data Quality',
      text: 'We used to struggle with high bounce rates using other list providers. Since switching to Win Wibe, our email deliverability has skyrocketed, and our sales team is booking 3x more qualified meetings.',
      name: 'Marketing Director',
      company: 'SaaS Company',
      initials: 'MD',
      gradient: 'linear-gradient(135deg, #4f8eff, #a855f7)'
    },
    {
      tag: 'A True Technology Partner',
      text: "Win Wibe didn't just help us with our SEO; their IT consulting team completely revamped our backend systems. They understand exactly how marketing and technology need to work together to drive revenue.",
      name: 'CEO',
      company: 'Logistics & Supply Chain',
      initials: 'CEO',
      gradient: 'linear-gradient(135deg, #22d3ee, #4f8eff)'
    },
    {
      tag: 'Accurate & Responsive',
      text: 'Win Wibe really knows their stuff. The data was spot on, and they got it over to us much faster than we expected. It’s rare to find someone this responsive who actually delivers exactly what they promised without any fluff.',
      name: 'Michael R.',
      company: 'Pro-Stream Pressure Washing',
      initials: 'MR',
      gradient: 'linear-gradient(135deg, #4f8eff, #a855f7)'
    },
    {
      tag: 'Smooth Process',
      text: 'It’s been a pleasure working with Win Wibe. They delivered high-quality, accurate data right on time. Their quick response and attention to detail made the whole process smooth and easy.',
      name: 'James P.',
      company: 'Elite Turf Management',
      initials: 'JP',
      gradient: 'linear-gradient(135deg, #22d3ee, #4f8eff)'
    },
    {
      tag: 'Excellent Quality',
      text: 'The quality of the inquiries we\'re getting from Win Wibe’s Meta ads is excellent. Every lead is exactly the type of patient we need for our clinic, and the turnaround on adjustments is impressive. Truly accurate work and a team that stays on top of communication.',
      name: 'Linda S.',
      company: 'Clinic Manager',
      initials: 'LS',
      gradient: 'linear-gradient(135deg, #f43f5e, #f97316)'
    }
  ];

  trackByName(index: number, item: any) {
    return item.name;
  }

  scrollLeft() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: -420, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollBy({ left: 420, behavior: 'smooth' });
    }
  }
}
