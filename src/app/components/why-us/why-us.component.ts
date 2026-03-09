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
      title: 'Data-Governed Decisions',
      description: 'We replace marketing guesswork with hard analytics. Every dollar spent is tracked to a measurable pipeline return.',
      icon: 'shield',
      state: 'idle'
    },
    {
      title: 'Unified Architecture',
      description: 'From verified B2B data to high-converting ad campaigns, we build seamless systems that actually communicate with each other.',
      icon: 'server',
      state: 'idle'
    },
    {
      title: 'Outcome-Obsessed',
      description: 'We do not report on vanity metrics like "impressions." We measure our success strictly by your lowered Customer Acquisition Cost (CAC) and closed deals.',
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
