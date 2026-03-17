import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fadeLeft, fadeRight, formSuccess, sectionFade } from '../../shared/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [fadeLeft, fadeRight, formSuccess, sectionFade]
})
export class ContactComponent {
  formSent = false;
  formLoading = false;
  form = {
    fullName: '',
    businessEmail: '',
    phoneNumber: '',
    companyName: '',
    selectedGoals: [] as string[],
    message: ''
  };

  goals = [
    { id: 'b2b-data', label: 'Verified B2B Contact Data' },
    { id: 'lead-gen', label: 'B2B Lead Generation' },
    { id: 'appt-setting', label: 'Executive Appointment Setting' },
    { id: 'digital-marketing', label: 'Digital Marketing (Meta/Google)' },
    { id: 'email-management', label: 'Email Campaign Management' },
    { id: 'organic-seo', label: 'Organic SEO' },
    { id: 'other', label: 'Other' }
  ];

  toggleGoal(goalId: string): void {
    const index = this.form.selectedGoals.indexOf(goalId);
    if (index === -1) {
      this.form.selectedGoals.push(goalId);
    } else {
      this.form.selectedGoals.splice(index, 1);
    }
  }

  isGoalSelected(goalId: string): boolean {
    return this.form.selectedGoals.includes(goalId);
  }

  onSubmit(contactNgForm: any): void {
    if (contactNgForm && contactNgForm.invalid) {
      Object.keys(contactNgForm.controls).forEach(key => {
        contactNgForm.controls[key].markAsTouched();
      });
      return;
    }

    // Custom validation for goals
    if (this.form.selectedGoals.length === 0) {
      return;
    }

    this.formLoading = true;

    // Construct Mailto link
    const email = 'info@winwibe.com';
    const subject = `New Inquiry from ${this.form.fullName} - Win Wibe Website`;
    const body = `Name: ${this.form.fullName}\n` +
      `Email: ${this.form.businessEmail}\n` +
      `Phone: ${this.form.phoneNumber || 'N/A'}\n` +
      `Company: ${this.form.companyName}\n` +
      `Selected Goals: ${this.form.selectedGoals.join(', ')}\n\n` +
      `Message:\n${this.form.message}`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      this.formLoading = false;
      this.formSent = true;

      // Open email client
      window.location.href = mailtoUrl;
    }, 800);
  }
}
