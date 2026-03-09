import { Component } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { listStagger, cardHover, sectionFade } from '../../shared/animations';

interface ServiceCard {
  num: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  color: string;
  state: 'idle' | 'hovered';
  expanded: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, SlicePipe],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  animations: [listStagger, cardHover, sectionFade]
})
export class ServicesComponent {
  services: ServiceCard[] = [
    {
      num: '01',
      title: 'Verified B2B Contact Data',
      tagline: 'Precision Intelligence for High-Ticket Sales',
      description: 'Outdated databases waste your sales team\'s time and destroy your domain reputation. Winwibe bypasses generic lists to provide real-time, high-fidelity contact intelligence. Filtered by strict Ideal Customer Profiles (ICP) and global intent signals, our data ensures you are only targeting verified US and international decision-makers with the actual authority to buy.',
      icon: 'database',
      image: 'assets/images/service_b2b_data.png',
      features: ['Real-time contact intelligence', 'ICP-based filtering', 'Global intent signal targeting', 'Verified decision-maker data'],
      color: '#4f8eff',
      state: 'idle',
      expanded: false
    },
    {
      num: '02',
      title: 'B2B Lead Generation Services',
      tagline: 'Intent-Driven Acquisition Engines',
      description: 'We design bespoke inbound and outbound funnels that consistently capture and nurture high-value prospects. By combining targeted content, frictionless landing pages, and advanced CRM integration, we deliver a predictable flow of sales-qualified leads (SQLs) that are primed for a conversion conversation.',
      icon: 'email',
      image: 'assets/images/service_b2b_lead_gen.png',
      features: ['Bespoke inbound & outbound funnels', 'Sales-qualified leads (SQLs)', 'CRM integration', 'Targeted content strategy'],
      color: '#a855f7',
      state: 'idle',
      expanded: false
    },
    {
      num: '03',
      title: 'Executive Appointment Setting',
      tagline: 'Filling Your Calendar with Qualified Buyers',
      description: 'Let your account executives focus strictly on closing. Winwibe\'s highly trained, US-market-fluent appointment setters act as a seamless extension of your internal team. We execute sophisticated, multi-touch outreach cadences across email and LinkedIn to secure qualified meetings directly on your calendar.',
      icon: 'calendar',
      image: 'assets/images/service_appointment.png',
      features: ['Multi-touch outreach cadences', 'Email & LinkedIn outreach', 'US-market-fluent setters', 'Qualified meeting scheduling'],
      color: '#22d3ee',
      state: 'idle',
      expanded: false
    },
    {
      num: '04',
      title: 'Omnichannel Digital Marketing',
      tagline: 'Algorithmic Media Buying & Market Capture',
      description: 'We surround your target accounts across the entire digital landscape. Through rigorous media buying on Meta, Google Search, Google Shopping, and LinkedIn, we capture high-intent traffic. Winwibe utilizes dynamic creative testing and advanced API tracking to aggressively lower your Cost Per Acquisition (CPA) and win market share from your competitors.',
      icon: 'search',
      image: 'assets/images/service_digital_marketing.png',
      features: ['Meta, Google, LinkedIn advertising', 'Dynamic creative testing', 'Advanced API conversion tracking', 'CPA reduction strategies'],
      color: '#f59e0b',
      state: 'idle',
      expanded: false
    },
    {
      num: '05',
      title: 'Email Campaign Management',
      tagline: 'Strategic Inbox Dominance',
      description: 'We manage the entire lifecycle of your outbound and inbound email infrastructure. From technical deliverability protocols (setting up DMARC/DKIM/SPF) to advanced behavioral sequencing and A/B subject line testing, we turn the inbox into your most reliable revenue channel while protecting your sender reputation.',
      icon: 'email',
      image: 'assets/images/service_email.png',
      features: ['DMARC/DKIM/SPF setup', 'Behavioral email sequencing', 'A/B subject line testing', 'Sender reputation management'],
      color: '#10b981',
      state: 'idle',
      expanded: false
    },
    {
      num: '06',
      title: 'Email Template Creation & Design',
      tagline: 'Conversion-Optimized Asset Design',
      description: 'Beautiful design means nothing if it doesn\'t drive a click. Winwibe\'s design team architects responsive, lightning-fast email templates built specifically to bypass corporate spam filters, render perfectly on mobile devices, and drive immediate action through strategic UI/UX principles.',
      icon: 'code',
      image: 'assets/images/service_email_design.png',
      features: ['Responsive mobile-first templates', 'Spam filter bypass optimization', 'Strategic UI/UX principles', 'Fast-loading email assets'],
      color: '#ec4899',
      state: 'idle',
      expanded: false
    },
    {
      num: '07',
      title: 'Organic Search Engine Optimization',
      tagline: 'Dominate Search. Drive Sustainable Revenue.',
      description: 'We build an organic acquisition engine that compoundingly lowers your customer acquisition cost over time. Winwibe executes a three-pillar SEO architecture: flawless technical web health, intent-driven content mapping to capture your buyers\' specific search queries, and authoritative digital PR to build undeniable domain trust globally.',
      icon: 'search',
      image: 'assets/images/service_seo.png',
      features: ['Technical SEO & web health audits', 'Intent-driven content mapping', 'Digital PR & link building', 'Global domain authority building'],
      color: '#4f8eff',
      state: 'idle',
      expanded: false
    }
  ];

  onServiceHover(card: ServiceCard, state: 'idle' | 'hovered'): void {
    card.state = state;
  }

  toggleExpand(card: ServiceCard): void {
    card.expanded = !card.expanded;
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
