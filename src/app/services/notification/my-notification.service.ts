import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class MyNotificationService {

  constructor(private notification: NzNotificationService) { }

  create(type: string, message: string, title?: string, duration: number = 2){
    this.notification.create(type,title ?? '', message, {
      nzDuration: duration
    });
  }
}
