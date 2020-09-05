import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { SquareComponent } from './components/square/square.component';
import { BoardComponent } from './components/board/board.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SquareComponent, BoardComponent, FooterComponent, SpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    SquareComponent,
    BoardComponent,
    FooterComponent,
    SpinnerComponent,
  ]
})
export class SharedModule { }
