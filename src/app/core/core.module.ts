import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';

import { SetupService } from './services/setup.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

export function StartupServiceFactory(setupService: SetupService): () => any {
  return () => setupService.initialize();
}

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [SetupService],
      multi: true
    }
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
