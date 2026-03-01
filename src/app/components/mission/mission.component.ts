import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { sectionFade } from '../../shared/animations';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  animations: [sectionFade]
})
export class MissionComponent {
  constructor(private router: Router) { }
  navigateTo(path: string): void { this.router.navigate([path]); }
}
