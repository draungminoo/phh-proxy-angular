import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayIdentifierKeyComponent } from './display-identifier-key.component';

describe('DisplayIdentifierKeyComponent', () => {
  let component: DisplayIdentifierKeyComponent;
  let fixture: ComponentFixture<DisplayIdentifierKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayIdentifierKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayIdentifierKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
