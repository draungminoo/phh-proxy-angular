import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppItemType } from '../../apps-list.type';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrl: './app-item.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
})
export class AppItemComponent implements OnChanges {
  @Input() item!: AppItemType;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        (this as any)[key] = changes[key].currentValue;
      }
    }
  }

  imageError() {
    this.item.imageUrl = 'assets/logo.jpg';
    this.cdr.detectChanges();
  }

  openAppInNewWindow(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    window.open(this.item.url, '_blank');
  }
}
