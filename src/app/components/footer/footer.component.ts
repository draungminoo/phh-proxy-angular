import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [],
})
export class FooterComponent {
  version: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
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
