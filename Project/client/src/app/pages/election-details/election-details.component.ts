import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Election, Voter, Candidate, ElectionService, User, UserService, District} from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-election-details',
	templateUrl: './election-details.component.html',
	styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit, OnDestroy {
	user: User;
	nominee: Candidate;
	userVotedAlready: boolean;
	userVotedFor: {};
	election: Election;
	loadingData: boolean;
	changeVote: boolean;
	errorMessage: string;
	currentElection: boolean;
	releaseResults: boolean;
	nominationsOpen: boolean;
	currentUserCanNominate: boolean;
	currentUserPartyHead: boolean;
	currentUserCandidate: boolean;
	partyNames: string[];
	predefinedCandidatePartyName: string;
	totalNumberOfVotes: number;
	paramSubscription: Subscription;

	constructor(private router: Router,
	            private activatedRoute: ActivatedRoute,
	            private electionService: ElectionService,
	            private userService: UserService) {
		this.election = new Election();
		this.nominee = new Candidate();
		const currentDate = new Date();
		this.election.dateFrom = new Date(currentDate.toDateString());
		this.election.dateTo = new Date(currentDate.toDateString());
		this.election.nominationCloseDate = new Date(currentDate.toDateString());
		this.election.resultsReleaseDate = new Date(currentDate.toDateString());
		this.currentElection = false;
		this.changeVote = false;
		this.currentElection = false;
		this.releaseResults = false;
		this.nominationsOpen = false;
		this.currentUserCanNominate = false;
		this.currentUserPartyHead = false;
		this.currentUserCandidate = false;
		this.predefinedCandidatePartyName = '';
		this.partyNames = [];
		this.totalNumberOfVotes = 0;
		this.errorMessage = '';
	}

	ngOnInit() {
		this.loadingData = true;
		this.user = this.userService.loggedInUser;
		const currentDate = new Date();

		this.paramSubscription = this.activatedRoute.params.subscribe(params => {
			if (params['electionId']) {
				this.electionService.findById(params['electionId']).then((election: Election) => {
					if (election.dateFrom < currentDate && election.dateTo > currentDate) {
						this.currentElection = true;
					}

					// release results?
					if (election.resultsStrategy === 'liveResults'
						|| election.resultsReleased
						|| (election.resultsStrategy === 'selectedDate' && election.resultsReleaseDate <= currentDate)) {
						this.releaseResults = true;
					}

					// Nomination Date passed?
					if (election.nominationCloseDate >= currentDate) {
						this.nominationsOpen = true;
					}

					// Can current user Nominate?
					if (this.user.role === this.user.USER_ROLES.ELECTION_OFFICIAL || election.candidatesStrategy === 'nomination') {
						this.currentUserCanNominate = true;
					}

					// is the user a party head? and also get all party names
					for (let i = 0; i < election.partyHeads.length; i++) {
						this.partyNames.push(election.partyHeads[i].partyName);
						if (election.partyHeads[i].email === this.user.email) {
							this.currentUserCanNominate = true;
							this.currentUserPartyHead = true;
							this.predefinedCandidatePartyName = election.partyHeads[i].partyName;
							break;
						}
					}
					// Select the first one as selected party
					if (this.currentUserPartyHead) {
						this.nominee.partyName = this.predefinedCandidatePartyName;
					} else if (this.partyNames.length > 0) {
						this.nominee.partyName = this.partyNames[0];
					}

					// is the user a candidate? TODO: Implement


					console.log('electionComponent', this);
					this.election = election;

					console.log(this);
					if (this.releaseResults) {
						this.totalNumberOfVotesUpdate(election);
					}
					this.updateViewData(election);
					this.loadingData = false;
				});
			} else {
				this.loadingData = false;
				this.router.navigate([this.electionService.urls.dashboard()]);
			}
		});
	}

	ngOnDestroy() {
		// cleanup
		this.paramSubscription.unsubscribe();
	}

	voteForCandidate(candidate: Candidate, district: District) {
		this.loadingData = true;

		const indexOfDistrict = this.election.districts.indexOf(district);
		const indexOfCandidate = this.election.districts[indexOfDistrict].candidates.indexOf(candidate);
		this.election.districts[indexOfDistrict].candidates[indexOfCandidate].numOfVotes++;
		let found = false;

		// See if the user already exists in the array
		for (let i = 0; i < this.election.districts[indexOfDistrict].voters.length; i++) {
			if (this.election.districts[indexOfDistrict].voters[i]._id._id === this.user._id) {
				this.election.districts[indexOfDistrict].voters[i].hasVoted = true;
				this.election.districts[indexOfDistrict].voters[i].votedFor = candidate._id._id ? candidate._id._id : candidate._id;
				found = true;
			}
		}

		// if not found in the array add in the array
		if (!found) {
			const voter = new Voter();
			voter._id = this.user._id;
			voter.hasVoted = true;
			voter.votedFor = candidate._id._id ? candidate._id._id : candidate._id;
			this.election.districts[indexOfDistrict].voters.push(voter);
		}

		// update the database
		this.electionService.update(this.election).then((updatedElection: Election) => {
			console.log('foreign updated one');
			console.log(updatedElection);
			this.election = updatedElection;
			this.totalNumberOfVotesUpdate(updatedElection);
			this.updateViewData(updatedElection);
			this.changeVote = false;
			this.loadingData = false;
		});
	}

	approveOrReject(approval, candidate, district: District) {
		this.loadingData = true;

		const indexOfDistrict = this.election.districts.indexOf(district);
		const indexOfCandidate = this.election.districts[indexOfDistrict].candidates.indexOf(candidate);
		this.election.districts[indexOfDistrict].candidates[indexOfCandidate].isApproved = approval;
		// update the database
		this.electionService.update(this.election).then((updatedElection: Election) => {
			console.log('foreign updated one');
			console.log(updatedElection);
			this.election = updatedElection;
			this.totalNumberOfVotesUpdate(updatedElection);
			this.updateViewData(updatedElection);
			this.changeVote = false;
			this.loadingData = true;
		});
	}

	nominateCandidate(nomineeForm, district) {
		this.loadingData = true;

		const nominee = new User();
		nominee.email = nomineeForm.value.email;
		nominee.name = nomineeForm.value.name;
		console.log('nominee', nominee);


		// Check if the registeredUser is already a candidate, also user cannot be candidate of multiple districts
		let userAlreadyIsCandidate = false;
		for (let i = 0; i < this.election.districts.length; i++) {
			for (let j = 0; j < this.election.districts[i].candidates.length; j++) {
				if (this.election.districts[i].candidates[j]._id.email === nominee.email) {
					userAlreadyIsCandidate = true;
					this.errorMessage = 'Nominee is already a candidate!!';
					break;
				}
			}
		}

		if (!userAlreadyIsCandidate) {
			this.userService.createIfNotExists(nominee).then((registeredUser: User) => {
				if (registeredUser) {
					const indexOfDistrict = this.election.districts.indexOf(district);

					const candidate = {
						_id: registeredUser._id,
						partyName: nomineeForm.value.partyName,
						numOfVotes: 0,
						isApproved: this.user.role === this.user.USER_ROLES.ELECTION_OFFICIAL ? 'approved' : 'pending'
					};
					const voter = {
						_id: registeredUser._id,
						hasVoted: false,
						votedFor: null
					};

					this.election.districts[indexOfDistrict].candidates.push(candidate);
					this.election.districts[indexOfDistrict].voters.push(voter);
					// update the database
					this.electionService.update(this.election).then((updatedElection: Election) => {
						console.log('foreign updated one');
						console.log(updatedElection);
						this.election = updatedElection;
						this.totalNumberOfVotesUpdate(updatedElection);
						this.updateViewData(updatedElection);
						this.changeVote = false;
					});
				}
				this.loadingData = false;
			});
		}
	}

	updateViewData(election: Election) {
		// has user already voted?
		let userVotedForId;
		for (let i = 0; i < election.districts.length; i++) {
			for (let j = 0; j < election.districts[i].voters.length; j++) {
				if (election.districts[i].voters[j]._id._id === this.user._id && election.districts[i].voters[j].hasVoted) {
					this.userVotedAlready = true;
					userVotedForId = election.districts[i].voters[j].votedFor;
					break;
				}
			}
		}

		// find the voted for person
		if (this.userVotedAlready) {
			for (let i = 0; i < election.districts.length; i++) {
				for (let j = 0; j < election.districts[i].candidates.length; j++) {
					if (election.districts[i].candidates[j]._id._id === userVotedForId) {
						this.userVotedFor = election.districts[i].candidates[j]._id;
						break;
					}
				}
			}
		}
	}

	totalNumberOfVotesUpdate(election: Election) {
		// Total number of votes
		this.totalNumberOfVotes = 0;
		for (let i = 0; i < election.districts.length; i++) {
			for (let j = 0; j < election.districts[i].voters.length; j++) {
				if (election.districts[i].voters[j].hasVoted) {
					this.totalNumberOfVotes++;
				}
			}
		}
	}

}
