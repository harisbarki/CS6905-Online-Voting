import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Election, ElectionService} from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-election-details',
	templateUrl: './election-details.component.html',
	styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit, OnDestroy {
	election: Election;
	loadingData: boolean;
	errorMessage: string;
	paramSubscription: Subscription;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private electionService: ElectionService) {
		this.election = new Election();
		const currentDate = new Date();
		this.election.dateFrom = new Date(currentDate.toDateString());
		this.election.dateTo = new Date(currentDate.toDateString());
		this.errorMessage = '';
	}

	ngOnInit() {
		this.paramSubscription = this.activatedRoute.params.subscribe(params => {
			if (params['electionId']) {
				this.loadingData = true;
				this.electionService.findById(params['electionId']).then((election: Election) => {
					this.election = election;
					this.loadingData = false;
				});
			} else {
				this.router.navigate([this.electionService.urls.dashboard()]);
			}
		});
	}

	ngOnDestroy() {
		// cleanup
		this.paramSubscription.unsubscribe();
	}

	nominateCandidate(election) {
		this.router.navigate(['/election/' + election._id + '/nominate-candidate']);
	}

}
