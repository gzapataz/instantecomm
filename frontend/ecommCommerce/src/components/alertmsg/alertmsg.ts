import {Component, OnInit} from '@angular/core';

/**
 * Generated class for the AlertmsgComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alertmsg',
  templateUrl: 'alertmsg.html'
})
export class AlertmsgComponent {

  text: string;

  constructor() {
    console.log('Hello AlertmsgComponent Component');
    this.text = 'Hello World';
  }

  show() {
    console.log('hola desde  ' + this.text)
  }

}
