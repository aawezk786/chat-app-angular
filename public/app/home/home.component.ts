import { Component, OnInit } from '@angular/core';
import { SocketService } from '../shared/socket.service';
import * as io from 'socket.io-client';

@Component({
    moduleId: module.id,
    selector: 'ch-home',
    styleUrls: ['home.styles.css'],
    templateUrl: 'home.template.html'
})

export class HomeComponent implements OnInit {
    messageText: string;
    messages: Array<any>;
    avatar: string = 'https://api.adorable.io/avatars/30/abott@adorable.png'
    selfAuthored: boolean = false;

    constructor(private _socketService: SocketService) { }

    ngOnInit() {
        this.messages = new Array();

        this._socketService.on('message-received', (msg: any) => {
            this.messages.push(msg);
            console.log(msg);
            console.log(this.messages);
        });
    }

    sendMessage() {
        const message = {
          text: this.messageText,
          date: Date.now(),
          imageUrl: this.avatar
        };
        this._socketService.emit('send-message', message);
        // console.log(message.text);
        this.messageText = '';
      }

    ngOnDestroy() {
      this._socketService.removeListener('send-message');
    }

  // ngOnInit() {
  //     this.socket.emit('event1', {
  //         msg: 'Client to server, can you hear me server?'
  //     });
  //     this.socket.on('event2', (data: any) => {
  //       console.log(data.msg);
  //       this.socket.emit('event3', {
  //           msg: 'Yes, its working for me!!'
  //       });
  //     });
  //     this.socket.on('event4', (data: any) => {
  //         console.log(data.msg);
  //     });

}
