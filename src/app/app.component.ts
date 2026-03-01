import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { navSlide, mobileMenuTrigger } from './shared/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [navSlide, mobileMenuTrigger]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  isBrowser: boolean;
  scrolled = false;
  menuOpen = false;

  // Particle canvas
  private ctx!: CanvasRenderingContext2D;
  private particles: any[] = [];
  private animFrame!: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      this.initParticles();
    }, 80);
  }

  ngOnDestroy(): void {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;
    this.scrolled = window.scrollY > 50;
    if (this.scrolled) {
      document.body.classList.add('scrolled-down');
    } else {
      document.body.classList.remove('scrolled-down');
    }
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void { this.menuOpen = false; }

  // Particle canvas logic
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
    const colors = [`rgba(79,142,255,`, `rgba(168,85,247,`, `rgba(34,211,238,`];
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
      this.particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) { Object.assign(p, this.makeParticle(canvas)); }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
      });
      this.animFrame = requestAnimationFrame(tick);
    };
    tick();
  }
}
