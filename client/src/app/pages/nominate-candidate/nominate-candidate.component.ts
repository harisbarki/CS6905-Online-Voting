import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Election, ElectionService, User, UserService} from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-nominate-candidate',
	templateUrl: './nominate-candidate.component.html',
	styleUrls: ['./nominate-candidate.component.scss']
})
export class NominateCandidateComponent implements OnInit, OnDestroy {

	user: User;
	election: Election;
	loadingData: boolean;
	errorMessage: string;
	paramSubscription: Subscription;

	constructor(private router: Router,
	            private activatedRoute: ActivatedRoute,
	            private electionService: ElectionService,
	            private userService: UserService) {
		this.election = new Election();
		const currentDate = new Date();
		this.election.dateFrom = new Date(currentDate.toDateString());
		this.election.dateTo = new Date(currentDate.toDateString());
		this.errorMessage = '';
	}

	ngOnInit() {
		this.user = this.userService.loggedInUser;

		this.paramSubscription = this.activatedRoute.params.subscribe(params => {
			if (params['electionId']) {
				this.loadingData = true;
				this.electionService.findById(params['electionId']).then((election: Election) => {
					this.election = election;
					this.loadingData = false;
				});
			} else {
				console.log('election not found');
				this.router.navigate([this.electionService.urls.dashboard()]);
			}
		});
	}

	ngOnDestroy() {
		// cleanup
		this.paramSubscription.unsubscribe();
	}

	onSubmit(nomination) {
		this.router.navigate(['/election/' + this.election._id + '/']);
	}
}
