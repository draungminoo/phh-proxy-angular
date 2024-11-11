import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OutdatedVersionDataType } from './outdated-verstion.type';

@Component({
  selector: 'app-outdated-version',
  templateUrl: './outdated-version.component.html',
  styleUrl: './outdated-version.component.scss',
  host: { class: 'app-host' },
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class OutdatedVersionComponent {
  outdatedPageData: OutdatedVersionDataType | null = null;

  constructor(private cdr: ChangeDetectorRef) {
    window.bridge.showAppMenu(false);

    window.bridge.getPageData('outdated-page', (data) => {
      this.outdatedPageData = data as any;
      this.cdr.detectChanges();
    });
  }

  downloadNewApp() {
    window.bridge.openLinkExternally(this.outdatedPageData?.downloadUrl ?? '');
  }
}
