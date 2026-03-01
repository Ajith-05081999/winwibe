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
    setTimeout(() => {
      this.formLoading = false;
      this.formSent = true;
    }, 1500);
  }
}
