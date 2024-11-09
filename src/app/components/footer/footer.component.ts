import { Component } from '@angular/core';
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
  version: string = '';

  private onDestroy = onComponentDestroy();

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        try {
          const obj: any = JSON.parse(params['query']);
          console.log(obj);

          this.version = obj?.version;
        } catch (error) {
          console.log(error);
        }
      });
  }
}
