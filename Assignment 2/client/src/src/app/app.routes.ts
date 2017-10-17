import {RouterModule, Routes} from '@angular/router';
import {
	HomeComponent,
	NoContentComponent,
	LoginComponent,
	CreateElectionComponent
} from './pages/'

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'create-election', component: CreateElectionComponent},
	{path: '**', component: NoContentComponent}
];

export const routes = RouterModule.forRoot(appRoutes, {useHash: true});
