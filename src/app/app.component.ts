import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  userId: string;
  newMessage: string;
  channelName: string;
  status = {};
  occupants = [];
  messages: any[];
  pubnub: PubNubAngular;
  constructor(pubnub: PubNubAngular) {
    this.channelName = 'channel1';

    pubnub.init({
      publishKey: 'demo',
      subscribeKey: 'demo',
      uuid: this.userId,
      triggerEvent: true
    });

    pubnub.subscribe({ channels: [this.channelName], triggerEvents: true });

    pubnub.getStatus(this.channelName, (status) => {
      this.status = status;
    });

    this.messages = pubnub.getMessage(this.channelName);

    this.pubnub = pubnub;
  }

  publish(){
    this.pubnub.publish({ message: this.newMessage, channel: this.channelName }, () => {
      this.newMessage = '';
    });
  }
}
