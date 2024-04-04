import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface IResultModalData{
  score: number
}
@Component({
  selector: 'app-result-zorro-modal',
  styleUrls: ['./result-zorro-modal.component.css'],
  template: `
      <div class="modal-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-4 col-md-0"></div>
          <div class="col-lg-4 col-md-12 d-flex justify-content-center align-items-center result-container">
            <img src="../../../assets/result_circle.png" alt="">
            <div class="text-center">
              <h3 class="mt-5">Your score</h3>
              <h1 class="mb-3">{{modalData.score}}</h1>
            </div>
          </div>
          <div class="col-lg-4 d-flex justify-content-center align-items-end mt-3">
            <button type="button" class="button-type-1" (click)="handleOk()">Complete</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ResultZorroModalComponent {
  constructor(
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public modalData: IResultModalData) {}


  handleOk(): void {
    this.modalRef.close();
  }

}
