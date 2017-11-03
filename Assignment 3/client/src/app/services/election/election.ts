export class Election {
	_id: String;
	name: String;
	winningStrategy: String;
	dateFrom: Date;
	dateTo: Date;
	isDistrictElections: Boolean;
	numberOfDistricts: Number;
	candidatesStrategy: String;
	totalVotesCasted: Number;
	candidates: Candidate[];
	voters: Voter[];

	constructor(election: Election = {} as Election) {
		this._id = election._id;
		this.name = election.name;
		this.winningStrategy = election.winningStrategy ? election.winningStrategy : '';
		this.dateFrom = new Date(election.dateFrom);
		this.dateTo = new Date(election.dateTo);
		this.isDistrictElections = election.isDistrictElections ? election.isDistrictElections : false;
		this.numberOfDistricts = election.numberOfDistricts ? election.numberOfDistricts : 0;
		this.candidatesStrategy = election.candidatesStrategy ? election.candidatesStrategy : '';
		this.totalVotesCasted = election.totalVotesCasted ? election.totalVotesCasted : 0;
		this.candidates = election.candidates ? election.candidates : [];
		this.voters = election.voters ? election.voters : [];
	}
}

export class Candidate {
	candidateId: any;
	numOfVotes: Number;
	isApproved: String;

	constructor(candidate: Candidate = {} as Candidate) {
		this.candidateId = candidate.candidateId;
		this.numOfVotes = candidate.numOfVotes;
		this.isApproved = candidate.isApproved;
	}
}

export class Voter {
	voterId: any;
	hasVoted: Boolean;
	votedFor: String;

	constructor(voter: Voter = {} as Voter) {
		this.voterId = voter.voterId;
		this.hasVoted = voter.hasVoted;
		this.votedFor = voter.votedFor;
	}
}
