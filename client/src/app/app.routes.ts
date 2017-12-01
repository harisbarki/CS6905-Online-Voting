import {RouterModule, Routes} from '@angular/router';

import {
	HomeComponent,
	NoContentComponent,
	LoginComponent,
	DashboardComponent,
	ElectionCreateEditComponent,
	ElectionDetailsComponent,
	ElectionResultComponent,
	VoteComponent,
	NominateCandidateComponent,
	ProfileComponent,
	RegisterUserComponent
} from './pages/';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'login', component: LoginComponent},
	{path: 'register', component: RegisterUserComponent},
	{path: 'profile', component: ProfileComponent},
	{path: 'dashboard', component: DashboardComponent},
	{path: 'election/create', component: ElectionCreateEditComponent},
	{path: 'election/:electionId/edit', component: ElectionCreateEditComponent},
	{path: 'election/:electionId/details', component: ElectionDetailsComponent},
	{path: 'election/:electionId/result', component: ElectionResultComponent},
	{path: 'election/:electionId/vote', component: VoteComponent},
	{path: 'election/:electionId/nominate-candidate', component: NominateCandidateComponent},
	{path: '**', component: NoContentComponent}
];

export const routes = RouterModule.forRoot(appRoutes, {useHash: true});
