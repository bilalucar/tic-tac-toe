import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { SquareComponent } from './components/square/square.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [SquareComponent, BoardComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    SquareComponent,
    BoardComponent,
  ]
})
export class SharedModule { }
