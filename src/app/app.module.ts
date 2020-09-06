import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    RoutesModule,
    LayoutModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
