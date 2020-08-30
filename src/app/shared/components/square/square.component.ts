import { Component, Input } from '@angular/core';
import { PlayerTypeEnum } from '../../enums/player-type.enum';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html'
})
export class SquareComponent {
  @Input() value;

  playerTypeEnum = PlayerTypeEnum;
}
