import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdatedVersionComponent } from './outdated-version.component';

describe('OutdatedVersionComponent', () => {
  let component: OutdatedVersionComponent;
  let fixture: ComponentFixture<OutdatedVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutdatedVersionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutdatedVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
