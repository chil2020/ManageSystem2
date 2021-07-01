import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
@Component({
  selector: 'sb-idle-timeout',
  templateUrl: './idle-timeout.component.html',
  styleUrls: ['./idle-timeout.component.scss']
})
export class IdleTimeoutComponent implements OnInit {
    public modalRef!: BsModalRef;
    @ViewChild('childModal')
    childModal!: ModalDirective;
  constructor() { }

  ngOnInit(): void {
  }

}
