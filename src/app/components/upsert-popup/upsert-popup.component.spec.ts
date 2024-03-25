import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPopupComponent } from './upsert-popup.component';

describe('UpsertPopupComponent', () => {
  let component: UpsertPopupComponent;
  let fixture: ComponentFixture<UpsertPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertPopupComponent]
    });
    fixture = TestBed.createComponent(UpsertPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
