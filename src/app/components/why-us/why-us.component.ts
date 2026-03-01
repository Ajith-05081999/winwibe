import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listStagger, cardHover, sectionFade } from '../../shared/animations';

interface EdgeCard {
  title: string;
  description: string;
  icon: string;
  state: 'idle' | 'hovered';
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css'],
  animations: [listStagger, cardHover, sectionFade]
})
export class WhyUsComponent {
  edgeCards: EdgeCard[] = [
    {
      title: 'Verified, High-Intent Data',
      description: 'AI-validated B2B lists continuously cleansed for maximum accuracy and high-intent engagement.',
      icon: 'shield',
      state: 'idle'
    },
    {
      title: 'End-to-End IT Integration',
      description: 'Alignment of your tech stack, CRM, and infrastructure to seamlessly handle and close leads.',
      icon: 'server',
      state: 'idle'
    },
    {
      title: 'ROI-Obsessed Marketing',
      description: 'ROI-driven strategies spanning SEO and email to maximise revenue per pound spent.',
      icon: 'chart',
      state: 'idle'
    }
  ];

  onEdgeHover(card: EdgeCard, state: 'idle' | 'hovered'): void {
    card.state = state;
  }

  trackByTitle(index: number, item: any) {
    return item.title;
  }
}
