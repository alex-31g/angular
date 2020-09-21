import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ImmutableMapComponent } from './immutable-map/immutable-map.component';
import { FromJsComponent } from './from-js/from-js.component';
import { ImmutableListComponent } from './immutable-list/immutable-list.component';

@NgModule({
  declarations: [AppComponent, ImmutableMapComponent, FromJsComponent, ImmutableListComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
