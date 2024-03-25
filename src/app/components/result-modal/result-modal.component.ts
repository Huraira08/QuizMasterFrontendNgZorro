import { Component, inject, Input } from '@angular/core';
import {NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// @Component({
//   selector: 'ngbd-modal-content',
//   standalone: true,
//   template:`
//   <div class="modal-header">
// 			<h4 class="modal-title">Hi there!</h4>
// 			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
// 		</div>
// 		<div class="modal-body">
// 			<p>Hello, {{ name }}!</p>
// 		</div>
// 		<div class="modal-footer">
// 			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
// 		</div>
//   `
// })

// export class NgbdModalContent{
//   activeModal = inject(NgbActiveModal)

//   @Input() name!: string;
// }

@Component({
  selector: 'app-result-modal',
  // templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.css'],
  template:`
  
		<!-- <div class="container"> -->
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
            <button type="button" class="button-type-1" (click)="activeModal.close()">Complete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- </div> -->
		<!-- <div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
		</div> -->
  `
})
export class ResultModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() score!: number;
}
