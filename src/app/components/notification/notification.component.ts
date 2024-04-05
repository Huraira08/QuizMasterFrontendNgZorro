import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(private notification: NzNotificationService){}
  success(message: string, title?: string, duration: number = 2){
    this.notification.success(title ?? '', message, {
      nzDuration: duration
    });
  }

  error(message: string, title?: string, duration: number = 2){
    this.notification.error(title ?? '', message, {
      nzDuration: duration
    });
  }
}
