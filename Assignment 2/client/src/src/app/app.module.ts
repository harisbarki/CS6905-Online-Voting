import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/';
import {
	HomeComponent,
	NoContentComponent,
	LoginComponent,
	CreateElectionComponent
} from './pages/';
import {routes} from './app.routes';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavbarComponent,
		LoginComponent,
		NoContentComponent,
		CreateElectionComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routes
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
