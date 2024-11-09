import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AppItemType } from '../../apps-list.type';

@Component({
  selector: 'app-app-item',
  templateUrl: './app-item.component.html',
  styleUrl: './app-item.component.scss',
  standalone: true,
  imports: [],
})
export class AppItemComponent implements OnChanges, AfterViewInit {
  @Input() item!: AppItemType;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (changes.hasOwnProperty(key)) {
        (this as any)[key] = changes[key].currentValue;
      }
    }
  }

  ngAfterViewInit() {
    //
  }
}
