import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { SharedModule } from '../shared/shared.module';

// COMPONENTS
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

const COMPONENTS = [
  // page components
  HomeComponent,
  GameComponent,
  AboutComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class RoutesModule {
}
