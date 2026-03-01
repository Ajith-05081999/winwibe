import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { MissionComponent } from './components/mission/mission.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'why-us', component: WhyUsComponent },
    { path: 'mission', component: MissionComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'testimonials', component: TestimonialsComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '' }
];
