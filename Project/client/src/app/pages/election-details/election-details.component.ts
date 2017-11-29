import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Election, Voter, Candidate, ElectionService, User, UserService} from '../../services';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-election-details',
	templateUrl: './election-details.component.html',
	styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit, OnDestroy {
	user: User;
	nominee: User;
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
	predefinedCandidatePartyName: string;
	totalNumberOfVotes: number;
	paramSubscription: Subscription;

	constructor(private router: Router,
	            private activatedRoute: ActivatedRoute,
	            private electionService: ElectionService,
	            private userService: UserService) {
		this.election = new Election();
		this.nominee = new User();
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

					// is the user a party head?
					for (let i = 0; i < election.partyHeads.length; i++) {
						if (election.partyHeads[i].email === this.user.email) {
							this.currentUserCanNominate = true;
							this.currentUserPartyHead = true;
							this.predefinedCandidatePartyName = election.partyHeads[i].partyName;
							break;
						}
					}

					// is the user a candidate? TODO: Implement


					console.log('election in controller', election);
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

	//
	// voteForCandidate(candidate: Candidate, election: Election) {
	// 	this.loadingData = true;
	//
	// 	const indexOfCandidate = election.candidates.indexOf(candidate);
	// 	election.candidates[indexOfCandidate].numOfVotes++;
	// 	let found = false;
	//
	// 	// See if the user already exists in the array
	// 	for (let i = 0; i < election.voters.length; i++) {
	// 		if (election.voters[i].voterId === this.user._id) {
	// 			election.voters[i].hasVoted = true;
	// 			election.voters[i].votedFor = candidate.candidateId._id ? candidate.candidateId._id : candidate.candidateId;
	// 			found = true;
	// 		}
	// 	}
	//
	// 	// if not found in the array add in the array
	// 	if (!found) {
	// 		const voter = new Voter();
	// 		voter.voterId = this.user._id;
	// 		voter.hasVoted = true;
	// 		voter.votedFor = candidate.candidateId._id ? candidate.candidateId._id : candidate.candidateId;
	// 		election.voters.push(voter);
	// 	}
	//
	// 	// update the database
	// 	this.electionService.update(election).then((updatedElection: Election) => {
	// 		console.log('foreign updated one');
	// 		console.log(updatedElection);
	// 		this.election = updatedElection;
	// 		this.totalNumberOfVotesUpdate(updatedElection);
	// 		this.updateViewData(updatedElection);
	// 		this.changeVote = false;
	// 		this.loadingData = false;
	// 	});
	// }
	//
	// nominateCandidate(nomineeForm) {
	// 	this.loadingData = true;
	//
	// 	this.userService.createIfNotExists(nomineeForm.value).then((user) => {
	// 		if (user) {
	// 			const candidate = {
	// 				candidateId: user._id,
	// 				numOfVotes: 0,
	// 				isApproved: this.user.role === this.user.USER_ROLES.ELECTION_OFFICIAL ? 'approved' : 'pending'
	// 			};
	// 			const voter = {
	// 				voterId: user._id,
	// 				hasVoted: false,
	// 				votedFor: null
	// 			};
	// 			this.election.candidates.push(candidate);
	// 			this.election.voters.push(voter);
	// 			// update the database
	// 			this.electionService.update(this.election).then((updatedElection: Election) => {
	// 				console.log('foreign updated one');
	// 				console.log(updatedElection);
	// 				this.election = updatedElection;
	// 				this.totalNumberOfVotesUpdate(updatedElection);
	// 				this.updateViewData(updatedElection);
	// 				this.changeVote = false;
	// 			});
	// 		}
	// 		this.loadingData = false;
	// 	});
	// }
	//
	// approveOrReject(approval, candidate, election) {
	// 	this.loadingData = true;
	//
	// 	const indexOfCandidate = election.candidates.indexOf(candidate);
	// 	election.candidates[indexOfCandidate].isApproved = approval;
	// 	// update the database
	// 	this.electionService.update(election).then((updatedElection: Election) => {
	// 		console.log('foreign updated one');
	// 		console.log(updatedElection);
	// 		this.election = updatedElection;
	// 		this.totalNumberOfVotesUpdate(updatedElection);
	// 		this.updateViewData(updatedElection);
	// 		this.changeVote = false;
	// 		this.loadingData = true;
	// 	});
	// }

	updateViewData(election: Election) {
		// has user already voted?
		let userVotedForId;
		for (let i = 0; i < election.districts.length; i++) {
			for (let j = 0; j < election.districts[i].voters.length; j++) {
				if (election.districts[i].voters[j]._id === this.user._id && election.districts[i].voters[j].hasVoted) {
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
