import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { onComponentDestroy } from '../../../resources/tools/on-destroy.task';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [],
})
export class FooterComponent {
  pageData: Record<string, any> = {};

  constructor(private cdr: ChangeDetectorRef) {
    window.bridge.getPageData('footer', (data) => {
      this.pageData = data;
    });
  }
}
