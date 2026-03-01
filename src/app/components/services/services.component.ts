import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listStagger, cardHover, sectionFade } from '../../shared/animations';

interface ServiceCard {
  num: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
  state: 'idle' | 'hovered';
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [listStagger, cardHover, sectionFade]
})
export class ServicesComponent {
  services: ServiceCard[] = [
    {
      num: '01',
      title: 'B2B Lead Generation',
      description: 'Reach decision-makers with AI-verified B2B databases tailored to your industry and location.',
      icon: 'email',
      features: ['Industry-specific targeting', 'AI-verified contact lists', 'Compliant outreach campaigns'],
      color: '#4f8eff',
      state: 'idle'
    },
    {
      num: '02',
      title: 'Digital Marketing & SEO',
      description: 'Technical SEO and content strategies engineered to attract high-intent organic traffic.',
      icon: 'search',
      features: ['Technical SEO audits', 'Content strategy & marketing', 'Social media management'],
      color: '#a855f7',
      state: 'idle'
    },
    {
      num: '03',
      title: 'Expert IT Consulting',
      description: 'Scalable CRM solutions and custom web applications to sustain your business growth.',
      icon: 'code',
      features: ['CRM implementation', 'Custom web applications', 'Infrastructure optimisation'],
      color: '#22d3ee',
      state: 'idle'
    },
    {
      num: '04',
      title: 'Data & Cleansing',
      description: 'Live database cross-referencing and firmographic appending to keep your data fresh.',
      icon: 'database',
      features: ['Live database cross-referencing', 'Firmographic data appending', 'Dead contact removal'],
      color: '#f59e0b',
      state: 'idle'
    }
  ];

  onServiceHover(card: ServiceCard, state: 'idle' | 'hovered'): void {
    card.state = state;
  }

  hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  trackByTitle(index: number, item: any) {
    return item.title;
  }

  trackByFeat(index: number, item: any) {
    return item;
  }
}
