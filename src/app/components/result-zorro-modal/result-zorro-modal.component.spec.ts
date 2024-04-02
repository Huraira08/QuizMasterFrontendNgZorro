import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultZorroModalComponent } from './result-zorro-modal.component';

describe('ResultZorroModalComponent', () => {
  let component: ResultZorroModalComponent;
  let fixture: ComponentFixture<ResultZorroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultZorroModalComponent]
    });
    fixture = TestBed.createComponent(ResultZorroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
