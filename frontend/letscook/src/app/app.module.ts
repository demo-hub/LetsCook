import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { FridgeComponent } from './fridge/fridge.component';
import { AddToFridgeModalComponent } from './fridge/add-to-fridge-modal/add-to-fridge-modal.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FridgeComponent,
    AddToFridgeModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    AutocompleteLibModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient, NgbTypeaheadConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
