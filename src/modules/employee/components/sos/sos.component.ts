
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '@modules/employee/services/web-socket.service';




@Component({
  selector: 'sb-sos-view',
  templateUrl: './sos.component.html',
  styleUrls: ['./sos.component.scss']
})
export class SosComponent implements OnInit {

  constructor(private wsService: WebSocketService) { }
  ngOnInit(): void {
      this.wsService.createObservableSocket('ws://192.168.1.100:7777/WebSocketServer/CHI').subscribe(
          data => console.log(data),
          err => console.log(err),
          () => console.log('complete')
      );
}
  ngOnDestroy(): void {
     this.wsService.closeWebSocket();

  }

  sendMessageToserver() {
      this.wsService.sendMessage('Hello from client');
  }
}
