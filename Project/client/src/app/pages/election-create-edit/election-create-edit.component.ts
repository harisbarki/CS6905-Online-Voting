import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Election, ElectionService} from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-election-create',
	templateUrl: './election-create-edit.component.html',
	styleUrls: ['./election-create-edit.component.scss']
})
export class ElectionCreateEditComponent implements OnInit, OnDestroy {

	election: Election;
	editElectionMode: boolean;
	loadingData: boolean;
	errorMessage: string;
	paramSubscription: Subscription;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private electionService: ElectionService) {
		this.election = new Election();
		this.election.winningStrategy = 'winnerTakesAll';
		this.election.candidatesStrategy = 'nomination';
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
					this.editElectionMode = true;
					this.loadingData = false;
				});
			} else {
				this.editElectionMode = false;
				this.loadingData = false;
			}
		});
	}

	ngOnDestroy() {
		// cleanup
		this.paramSubscription.unsubscribe();
	}

	onSubmit(election) {
		this.errorMessage = '';
		if (this.election.dateFrom > this.election.dateTo) {
			this.errorMessage = 'Starting date of election can not be after end date!!';
		} else {
			// console.log(this.election);
			if (this.editElectionMode) {
				this.election.dateFrom = new Date(this.election.dateFrom);
				this.election.dateTo = new Date(this.election.dateTo);
				console.log('Updating election', this.election);
				this.electionService.update(this.election).then(() => {
					this.router.navigate([this.electionService.urls.dashboard()]);
				}).catch((err) => {
					console.error(err);
					this.errorMessage = err;
				});
			} else {
				console.log('Creating election', this.election);
				this.electionService.create(this.election).then(() => {
					this.router.navigate([this.electionService.urls.dashboard()]);
				}).catch((err) => {
					console.error(err);
					this.errorMessage = err;
				});
			}
		}
		// console.log('election', election);
		// console.log('this.election', this.election);
	}


}
