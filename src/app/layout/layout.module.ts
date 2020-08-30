import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LayoutDefaultComponent } from './default/default.component';

const COMPONENTS = [
  LayoutDefaultComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule { }
