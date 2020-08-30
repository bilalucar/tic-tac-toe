import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { preloaderFinished } from './app/shared/utils/preloader.util';

import { environment } from './environments/environment';

preloaderFinished();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(res => {
    if ((window as any).appBootstrap) {
      (window as any).appBootstrap();
    }
    return res;
  })
  .catch(err => console.log(err));
