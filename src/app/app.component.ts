import { Component } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pubnubService: PubNubAngular;
  userId: string;
  newMessage: string;
  channelName: string;
  status = {};
  presence = {};
  occupants = [];
  messages = [];
  constructor(pubnubService: PubNubAngular) {
    this.pubnubService = pubnubService;
    this.userId = 'User ' + Math.round(Math.random() * 1000);
    this.newMessage = '';
    this.channelName = 'PubNub-Angular2-TestDemoTS';

    this.pubnubService.init({
      publishKey: 'demo',
      subscribeKey: 'demo',
      uuid: this.userId
    });

    this.pubnubService.subscribe({channels: [this.channelName], triggerEvents: true, withPresence: true, autoload: 50});

    this.messages = pubnubService.getMessage(this.channelName);

    let self = this;

    pubnubService.getPresence(this.channelName, (presence) => {
      self.presence = presence;

      self.pubnubService.hereNow({
        channels: [self.channelName],
        includeUUIDs: true,
        includeState: true
      }).then(function (response) {
        self.occupants = response.channels[self.channelName].occupants;
      }).catch((error) => {});
    });

    pubnubService.getStatus(this.channelName, (status) => {
      self.status = status;
    });
  }

  publish(){
    if (this.newMessage !== '') {
      this.pubnubService.publish({message: '[' + this.userId + '] ' + this.newMessage, channel: this.channelName});
      this.newMessage = '';
    }
  }
}
