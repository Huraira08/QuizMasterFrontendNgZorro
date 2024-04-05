import { TestBed } from '@angular/core/testing';

import { MyNotificationService } from './my-notification.service';

describe('MyNotificationService', () => {
  let service: MyNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
