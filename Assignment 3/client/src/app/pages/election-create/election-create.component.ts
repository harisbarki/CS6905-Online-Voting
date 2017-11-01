import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Election, ElectionService} from '../../services';

@Component({
	selector: 'app-election-create',
	templateUrl: './election-create.component.html',
	styleUrls: ['./election-create.component.scss']
})
export class ElectionCreateComponent implements OnInit {

	election: Election;
	editElectionMode: boolean;
	loadingData: boolean;
	dateTo: string;
	dateFrom: string;
	errorMessage: string;

	constructor(private router: Router, private activatedRoute: ActivatedRoute, private electionService: ElectionService) {
		this.election = new Election();
		this.dateFrom = '';
		this.dateTo = '';
		this.errorMessage = '';
	}

	ngOnInit() {

		this.activatedRoute.params.subscribe(params => {
			if (params['electionId']) {
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

	onSubmit(election) {
		this.errorMessage = '';
		this.election.dateTo = new Date(this.dateTo);
		this.election.dateFrom = new Date(this.dateFrom);
		if (this.election.dateFrom > this.election.dateTo) {
			this.errorMessage = 'Starting date of election can not be after end date!!';
		} else {
			this.electionService.create(this.election).then((returnedElection: Election) => {
				this.election = returnedElection;
			}).catch((err) => {
				console.error(err);
				this.errorMessage = err;
			});
		}
		console.log('election', election);
		console.log('this.election', this.election);
	}


}
