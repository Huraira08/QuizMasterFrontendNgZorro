import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-zorro-modal',
  // templateUrl: './result-zorro-modal.component.html',
  styleUrls: ['./result-zorro-modal.component.css'],
  template: `
    <!-- <button nz-button nzType="primary" (click)="showModal()"><span>Show Modal</span></button> -->
    <nz-modal
      [(nzVisible)]="isVisible"
      [nzContent]="modalContent"
      [nzFooter]="null"
      [nzWidth]="716"
      [nzClosable]="false"
    >
      <ng-template #modalContent>
      <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-0"></div>
          <div class="col-lg-4 col-md-12 d-flex justify-content-center align-items-center result-container">
            <img src="../../../assets/result_circle.png" alt="">
            <div class="text-center">
              <h3 class="mt-5">Your score</h3>
              <h1 class="mb-3">{{score}}</h1>
            </div>
          </div>
          <div class="col-lg-4 d-flex justify-content-center align-items-end mt-3">
            <button type="button" class="button-type-1" (click)="handleOk()">Complete</button>
          </div>
        </div>
      </div>
    </div>
      </ng-template>
    </nz-modal>
  `
})
export class ResultZorroModalComponent {
  @Input() isVisible!: boolean;
  // @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() closeClicked = new EventEmitter<void>();
  @Input() score!: number;

  constructor() {}

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    // this.isVisibleChange.emit(false);
    this.closeClicked.emit();
  }

  // handleCancel(): void {
  //   console.log('Button cancel clicked!');
  //   this.isVisible = false;
  //   this.isVisibleChange.emit(false);
  // }
}
