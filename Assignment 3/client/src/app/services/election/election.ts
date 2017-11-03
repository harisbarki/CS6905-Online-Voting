export class Election {
	_id: string;
	name: string;
	winningStrategy: string;
	dateFrom: Date;
	dateTo: Date;
	isDistrictElections: boolean;
	numberOfDistricts: number;
	candidatesStrategy: string;
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
		this.candidates = election.candidates ? election.candidates : [];
		this.voters = election.voters ? election.voters : [];
	}
}

export class Candidate {
	candidateId: any;
	numOfVotes: number;
	isApproved: string;

	constructor(candidate: Candidate = {} as Candidate) {
		this.candidateId = candidate.candidateId;
		this.numOfVotes = candidate.numOfVotes;
		this.isApproved = candidate.isApproved;
	}
}

export class Voter {
	voterId: any;
	hasVoted: boolean;
	votedFor: string;

	constructor(voter: Voter = {} as Voter) {
		this.voterId = voter.voterId;
		this.hasVoted = voter.hasVoted;
		this.votedFor = voter.votedFor;
	}
}
