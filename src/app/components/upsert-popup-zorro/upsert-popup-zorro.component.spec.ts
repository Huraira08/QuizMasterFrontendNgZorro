import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertPopupZorroComponent } from './upsert-popup-zorro.component';

describe('UpsertPopupZorroComponent', () => {
  let component: UpsertPopupZorroComponent;
  let fixture: ComponentFixture<UpsertPopupZorroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertPopupZorroComponent]
    });
    fixture = TestBed.createComponent(UpsertPopupZorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
