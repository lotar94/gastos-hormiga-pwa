import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore, connectFirestoreEmulator } from '@angular/fire/firestore';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { WeekSliderComponent } from './components/week-slider/week-slider.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    WeekSliderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore()
      // connectFirestoreEmulator(firestore, 'http://localhost', 9098)
      return firestore

    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAuth(() => {
      const auth = getAuth();
      // connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true})
      return auth;
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
