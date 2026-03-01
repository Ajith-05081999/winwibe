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

    // Construct WhatsApp message
    const phoneNumber = '+919611451066';
    const message = `*New Inquiry from Win Wibe Website*%0A%0A` +
      `*Name:* ${this.form.fullName}%0A` +
      `*Email:* ${this.form.businessEmail}%0A` +
      `*Phone:* ${this.form.phoneNumber}%0A` +
      `*Company:* ${this.form.companyName}%0A` +
      `*Primary Goal:* ${this.form.primaryGoal}%0A%0A` +
      `*Message:* %0A${this.form.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

    setTimeout(() => {
      this.formLoading = false;
      this.formSent = true;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    }, 1200);
  }
}
