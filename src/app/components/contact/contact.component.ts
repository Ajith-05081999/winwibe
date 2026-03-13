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
    primaryGoal: '',
    message: ''
  };

  onSubmit(contactNgForm: any): void {
    if (contactNgForm && contactNgForm.invalid) {
      Object.keys(contactNgForm.controls).forEach(key => {
        contactNgForm.controls[key].markAsTouched();
      });
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
      `Primary Goal: ${this.form.primaryGoal}\n\n` +
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
