import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PormptDialogComponent } from './prompt-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: PormptDialogComponent;
  let fixture: ComponentFixture<PormptDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PormptDialogComponent]
    });
    fixture = TestBed.createComponent(PormptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
