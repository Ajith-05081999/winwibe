import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  PLATFORM_ID,
  Inject,
  signal,
  computed
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
  keyframes,
  animation,
  useAnimation,
  group
} from '@angular/animations';

// ---- Reusable animation factories ----
const fadeUp = trigger('fadeUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(40px)' }),
    animate('800ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

const fadeLeft = trigger('fadeLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate('800ms 100ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

const fadeRight = trigger('fadeRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate('800ms 100ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

const listStagger = trigger('listStagger', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(30px)' }),
      stagger(120, [
        animate('600ms cubic-bezier(0.4,0,0.2,1)',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

const cardHover = trigger('cardHover', [
  state('idle', style({ transform: 'translateY(0)   scale(1)', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' })),
  state('hovered', style({ transform: 'translateY(-8px) scale(1.02)', boxShadow: '0 20px 60px rgba(79,142,255,0.18)' })),
  transition('idle <=> hovered', animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)'))
]);

const navSlide = trigger('navSlide', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate('600ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

const mobileMenu = trigger('mobileMenu', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(100%)' }),
    animate('500ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      style({ opacity: 1, transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('400ms cubic-bezier(0.4,0,0.2,1)',
      style({ opacity: 0, transform: 'translateX(100%)' }))
  ])
]);

const formSuccess = trigger('formSuccess', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.92)' }),
    animate('500ms cubic-bezier(0.4,0,0.2,1)',
      style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

interface ServiceCard {
  num: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
  state: 'idle' | 'hovered';
}

interface EdgeCard {
  title: string;
  description: string;
  icon: string;
  state: 'idle' | 'hovered';
}

interface Stat {
  value: number;
  display: string;
  suffix: string;
  label: string;
  current: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeUp, fadeLeft, fadeRight, listStagger,
    cardHover, navSlide, mobileMenu, formSuccess
  ]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  title = 'winwibe';
  isBrowser: boolean;
  scrolled = false;
  menuOpen = false;
  formSent = false;
  formLoading = false;

  // Visibility flags driven by IntersectionObserver
  heroVisible = false;
  edgeVisible = false;
  missionVisible = false;
  servicesVisible = false;
  testimonialsVisible = false;
  ctaVisible = false;
  contactVisible = false;

  // Badge rotating text
  badgeTexts = [
    'Trusted by B2B Leaders Worldwide',
    '500+ Clients Scaled Successfully',
    '3x More Qualified Meetings',
    '98% Email Deliverability Rate'
  ];
  badgeIndex = 0;
  badgeVisible = true;
  private badgeInterval: any;

  // Stats
  stats: Stat[] = [
    { value: 3, display: '0', suffix: 'x', label: 'More Qualified Meetings', current: 0 },
    { value: 98, display: '0', suffix: '%', label: 'Email Deliverability', current: 0 },
    { value: 500, display: '0', suffix: '+', label: 'B2B Clients Served', current: 0 }
  ];

  // Edge section
  edgeCards: EdgeCard[] = [
    {
      title: 'Verified, High-Intent Data',
      description: 'Unlike competitors relying on outdated databases, our B2B email lists are continuously cleansed using AI and human intelligence. Every contact is validated for accuracy, ensuring your campaigns reach decision-makers who are ready to engage.',
      icon: 'shield',
      state: 'idle'
    },
    {
      title: 'End-to-End IT Integration',
      description: 'We don\'t just generate leads — we ensure your tech stack, CRM, and infrastructure are optimised to handle and close them. Our IT consulting team aligns your technology with your marketing strategy for seamless execution.',
      icon: 'server',
      state: 'idle'
    },
    {
      title: 'ROI-Obsessed Marketing',
      description: 'From SEO to custom email campaigns, every Win Wibe strategy is built around one metric: your return on investment. We track, measure, and optimise relentlessly to maximise your revenue per pound spent.',
      icon: 'chart',
      state: 'idle'
    }
  ];

  // Services section
  services: ServiceCard[] = [
    {
      num: '01',
      title: 'B2B Lead Generation & Email Marketing',
      description: 'Get directly in front of key decision-makers with meticulously curated, highly accurate B2B email databases tailored to your specific industry, geography, and target titles. Maximise engagement and lower bounce rates.',
      icon: 'email',
      features: ['Industry-specific targeting', 'AI-verified contact lists', 'Compliant outreach campaigns'],
      color: '#4f8eff',
      state: 'idle'
    },
    {
      num: '02',
      title: 'Digital Marketing & SEO',
      description: 'Dominate the digital landscape with specialists in Search Engine Optimisation, content marketing, and social media management. Engineer your online presence to attract high-intent organic traffic.',
      icon: 'search',
      features: ['Technical SEO audits', 'Content strategy & marketing', 'Social media management'],
      color: '#a855f7',
      state: 'idle'
    },
    {
      num: '03',
      title: 'Expert IT Consulting',
      description: 'Marketing brings the traffic; technology sustains the business. Our IT consulting team helps you optimise your digital infrastructure, implement scalable CRM solutions, and develop custom web applications.',
      icon: 'code',
      features: ['CRM implementation', 'Custom web applications', 'Infrastructure optimisation'],
      color: '#22d3ee',
      state: 'idle'
    },
    {
      num: '04',
      title: 'Data Appending & Cleansing',
      description: 'Data decays fast. We take your existing contact lists and cross-reference them against live databases to fill missing information, remove dead contacts, and append rich firmographic data.',
      icon: 'database',
      features: ['Live database cross-referencing', 'Firmographic data appending', 'Dead contact removal'],
      color: '#f59e0b',
      state: 'idle'
    }
  ];

  // Testimonials
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
      text: 'Win Wibe didn\'t just help us with our SEO; their IT consulting team completely revamped our backend systems. They understand exactly how marketing and technology need to work together to drive revenue.',
      name: 'CEO',
      company: 'Logistics & Supply Chain',
      initials: 'CEO',
      gradient: 'linear-gradient(135deg, #22d3ee, #4f8eff)'
    }
  ];

  // Form model
  form = {
    fullName: '',
    businessEmail: '',
    phoneNumber: '',
    companyName: '',
    primaryGoal: '',
    message: ''
  };

  // Particle canvas
  private ctx!: CanvasRenderingContext2D;
  private particles: any[] = [];
  private animFrame!: number;
  private observers: IntersectionObserver[] = [];
  private statsAnimated = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.startBadgeRotation();
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.heroVisible = true;
      this.initParticles();
      this.setupObservers();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    if (this.badgeInterval) clearInterval(this.badgeInterval);
    this.observers.forEach(o => o.disconnect());
  }

  // ==========================
  // NAVBAR
  // ==========================
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;
    const currentScroll = window.scrollY;
    this.scrolled = currentScroll > 50;

    // Toggle body class for dynamic text color change
    if (this.scrolled) {
      document.body.classList.add('scrolled-down');
    } else {
      document.body.classList.remove('scrolled-down');
    }
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }

  scrollTo(id: string): void {
    this.closeMenu();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ==========================
  // BADGE ROTATION
  // ==========================
  startBadgeRotation(): void {
    this.badgeInterval = setInterval(() => {
      this.badgeVisible = false;
      setTimeout(() => {
        this.badgeIndex = (this.badgeIndex + 1) % this.badgeTexts.length;
        this.badgeVisible = true;
      }, 350);
    }, 3500);
  }

  // ==========================
  // INTERSECTION OBSERVERS
  // ==========================
  setupObservers(): void {
    const observe = (id: string, callback: () => void, threshold = 0.15) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { callback(); obs.disconnect(); }
      }, { threshold });
      obs.observe(el);
      this.observers.push(obs);
    };

    observe('edge-section', () => this.edgeVisible = true);
    observe('mission-section', () => this.missionVisible = true);
    observe('services-section', () => this.servicesVisible = true);
    observe('testimonials-section', () => this.testimonialsVisible = true);
    observe('cta-section', () => this.ctaVisible = true);
    observe('contact-section', () => this.contactVisible = true);
    observe('stats-row', () => this.animateStats(), 0.5);
  }

  // ==========================
  // STATS COUNTER
  // ==========================
  animateStats(): void {
    if (this.statsAnimated) return;
    this.statsAnimated = true;
    this.stats.forEach(stat => {
      const duration = 2000;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        stat.current = Math.round(ease * stat.value);
        stat.display = String(stat.current);
        if (progress < 1) requestAnimationFrame(tick);
        else stat.display = String(stat.value);
      };
      requestAnimationFrame(tick);
    });
  }

  // ==========================
  // CARD HOVER
  // ==========================
  onEdgeHover(card: EdgeCard, state: 'idle' | 'hovered'): void { card.state = state; }
  onServiceHover(card: ServiceCard, state: 'idle' | 'hovered'): void { card.state = state; }

  // ==========================
  // FORM SUBMIT
  // ==========================
  onSubmit(contactNgForm: any): void {
    if (contactNgForm && contactNgForm.invalid) {
      Object.keys(contactNgForm.controls).forEach(key => {
        contactNgForm.controls[key].markAsTouched();
      });
      return;
    }
    this.formLoading = true;
    setTimeout(() => {
      this.formLoading = false;
      this.formSent = true;
    }, 1500);
  }

  // ==========================
  // HELPER
  // ==========================
  hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
  }

  // ==========================
  // PARTICLE CANVAS
  // ==========================
  initParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas(canvas);
    window.addEventListener('resize', () => this.resizeCanvas(canvas));
    this.createParticles(canvas);
    this.animateParticles(canvas);
  }

  resizeCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.createParticles(canvas);
  }

  createParticles(canvas: HTMLCanvasElement): void {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 110);
    this.particles = Array.from({ length: count }, () => this.makeParticle(canvas));
  }

  makeParticle(canvas: HTMLCanvasElement): any {
    const colors = [
      `rgba(79,142,255,`,
      `rgba(168,85,247,`,
      `rgba(34,211,238,`
    ];
    const opacity = Math.random() * 0.45 + 0.1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.6 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity,
      color: `${color}${opacity})`
    };
  }

  animateParticles(canvas: HTMLCanvasElement): void {
    const ctx = this.ctx;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw connections
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const dx = this.particles[i].x - this.particles[j].x;
          const dy = this.particles[i].y - this.particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(79,142,255,${0.05 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(this.particles[i].x, this.particles[i].y);
            ctx.lineTo(this.particles[j].x, this.particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw & move particles
      this.particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          Object.assign(p, this.makeParticle(canvas));
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      this.animFrame = requestAnimationFrame(tick);
    };
    tick();
  }
}
