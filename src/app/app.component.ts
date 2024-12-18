import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { invoke } from '@tauri-apps/api/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent {
  urlForm = new FormControl();
  targetUrl: string = '';

  constructor() {
    this.urlForm.valueChanges.subscribe({
      next: (url) => {
        this.targetUrl = url;
      },
    });
  }

  setProxy() {
    try {
      console.log('Connecting to whatsapp');
      invoke('set_proxy', { ip: '172.33.157.252', port: '8118' });
    } catch (error) {
      console.error('Error fetching WhatsApp:', error);
    }
  }
}
