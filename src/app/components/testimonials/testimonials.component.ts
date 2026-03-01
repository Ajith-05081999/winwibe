import { Component } from '@angular/core';
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
    }
  ];

  trackByName(index: number, item: any) {
    return item.name;
  }
}
