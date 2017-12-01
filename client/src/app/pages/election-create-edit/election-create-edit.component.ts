import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Election, ElectionService, User, UserService, PartyHead, District, Voter} from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-election-create',
	templateUrl: './election-create-edit.component.html',
	styleUrls: ['./election-create-edit.component.scss']
})
export class ElectionCreateEditComponent implements OnInit, OnDestroy {

	loginSubscription: any;
	user: User;
	election: Election;
	editElectionMode: boolean;
	loadingData: boolean;
	errorMessage: string;
	paramSubscription: Subscription;

	constructor(private router: Router,
	            private activatedRoute: ActivatedRoute,
	            private electionService: ElectionService,
	            private userService: UserService) {
		this.election = new Election();
		this.election.winningStrategy = 'winnerTakesAll';
		this.election.candidatesStrategy = 'nomination';
		this.election.resultsStrategy = 'liveResults';
		const currentDate = new Date();
		this.election.dateFrom = new Date(currentDate.toDateString());
		this.election.dateTo = new Date(currentDate.toDateString());
		this.election.nominationCloseDate = new Date(currentDate.toDateString());
		this.election.resultsReleaseDate = new Date(currentDate.toDateString());
		this.errorMessage = '';

		this.loginSubscription = userService.loggedInChange.subscribe((value) => {
			this.user = this.userService.loggedInUser;
			if (this.user.role !== this.user.USER_ROLES.ELECTION_OFFICIAL) {
				this.router.navigate(['/dashboard']);
			}
		});
	}

	ngOnInit() {

		this.paramSubscription = this.activatedRoute.params.subscribe(params => {
			if (params['electionId']) {
				this.loadingData = true;
				this.electionService.findById(params['electionId']).then((election: Election) => {
					// get the tempVoters
					const tempVoters = [];
					for (let i = 0; i < election.districts.length; i++) {
						for (let j = 0; j < election.districts[i].voters.length; j++) {
							tempVoters.push(election.districts[i].voters[j]._id.email);
						}
						election.districts[i].tempVoters = tempVoters.join(', ');
					}

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
		this.loginSubscription.unsubscribe();
	}

	async onSubmit() {
		this.errorMessage = '';
		if (this.election.dateFrom > this.election.dateTo && this.election.nominationCloseDate > this.election.dateTo) {
			this.errorMessage = 'Starting date/nomination closing date of election can not be after end date!!';
		} else {
			this.loadingData = true;

			// add partyHeads and voters
			this.election = await this.addVotersAndPartyHeads(this.election);

			console.log('added voters and partyHeads', this.election);

			if (this.editElectionMode) {
				this.election.dateFrom = new Date(this.election.dateFrom);
				this.election.dateTo = new Date(this.election.dateTo);
				this.election.nominationCloseDate = new Date(this.election.nominationCloseDate);
				if (this.election.resultsStrategy === 'selectedDate') {
					this.election.resultsReleaseDate = new Date(this.election.resultsReleaseDate);
				} else {
					this.election.resultsReleaseDate = null;
				}
				console.log('Updating election', this.election);
				await this.electionService.update(this.election).then(() => {
					this.router.navigate([this.electionService.urls.dashboard()]);
				}).catch((err) => {
					console.error(err);
					this.errorMessage = err;
				});
			} else {
				console.log('Creating election', this.election);
				await this.electionService.create(this.election).then(() => {
					this.router.navigate([this.electionService.urls.dashboard()]);
				}).catch((err) => {
					console.error(err);
					this.errorMessage = err;
				});
			}
			// this should run after everything is done because of async await
			this.loadingData = false;
		}
	}

	addEmptyPartyHead() {
		this.election.partyHeads.push(new PartyHead);
	}

	addEmptyDistrict() {
		this.election.districts.push(new District);
	}


	async addVotersAndPartyHeads(election: Election) {
		// party heads
		for (let i = 0; i < election.partyHeads.length; i++) {
			const user = new User();
			user.email = election.partyHeads[i].email;
			// if _id doesn't exists that means the user is not in database so create it
			if (!election.partyHeads[i]._id) {
				const receivedUser = await this.userService.createIfNotExists(user);
				election.partyHeads[i]._id = receivedUser._id;
			}
		}

		// voters
		for (let i = 0; i < election.districts.length; i++) {
			const voterEmails = election.districts[i].tempVoters.trim().split(',');
			for (let j = 0; j < voterEmails.length; j++) {
				voterEmails[j] = voterEmails[j].trim();
				const user = new User();
				user.email = voterEmails[j];

				// check to see if the user already exists in the voters list
				let userAlreadyPresent = false;
				for (let k = 0; k < election.districts[i].voters.length; k++) {
					if (election.districts[i].voters[k]._id.email === voterEmails[j]) {
						userAlreadyPresent = true;
						break;
					}
				}

				if (!userAlreadyPresent) {
					const receivedUser = await this.userService.createIfNotExists(user);
					const voter = {
						_id: receivedUser._id,
						hasVoted: false,
						votedFor: null
					};
					election.districts[i].voters.push(new Voter(voter));
				}
			}

			// // delete the deleted ones
			// let userPresentInNewList = false;
			// for (let k = 0; k < election.districts[i].voters.length; k++) {
			// 	for (let j = 0; j < voterEmails.length; j++) {
			// 		if (election.districts[i].voters[k]._id.email === voterEmails[j]) {
			// 			userPresentInNewList = true;
			// 			break;
			// 		}
			// 	}
			//
			// 	if (!userPresentInNewList) {
			// 		console.log('deleting user from voters array', election.districts[i].voters[k]._id.email);
			// 		election.districts[i].voters.splice(k, 1);
			// 		k--;
			// 	}
			// }
		}

		return await election;
	}
}
