import {RouterModule, Routes} from '@angular/router';
import {
	HomeComponent,
	NoContentComponent,
	LoginComponent,
	DashboardComponent,
	ElectionCreateComponent,
	ElectionDetailsComponent,
	ElectionResultComponent,
	VoteComponent,
	NominateCandidateComponent,
	ProfileComponent,
	RegisterUserComponent
} from './pages/'

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterUserComponent},
	{path: 'profile', component: ProfileComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'election/create', component: ElectionCreateComponent},
	{path: 'election/:id/edit', component: ElectionCreateComponent},
	{path: 'election/:id/details', component: ElectionDetailsComponent},
	{path: 'election/:id/result', component: ElectionResultComponent},
	{path: 'election/:id/vote', component: VoteComponent},
	{path: 'election/:id/nominate-candidate', component: NominateCandidateComponent},
	{path: '**', component: NoContentComponent}
];

export const routes = RouterModule.forRoot(appRoutes, {useHash: true});
