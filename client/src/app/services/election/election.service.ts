import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Election} from './election';
import {environment} from '../../../environments/environment';

@Injectable()
export class ElectionService {

	private elections: Election[] = [];

	private serverUrl = '/api/election';
	private serviceName = 'ElectionService';
	urls = {
		dashboard: () => {
			return '/dashboard';
		},
		election: (electionId) => {
			return '/election/' + electionId + '/details';
		}
	};

	// Cache functions
	private AddOrUpdate(election: Election) {
		let found = false;
		for (let i = 0; i < this.elections.length; i++) {
			if (election._id === this.elections[i]._id) {
				this.elections[i] = election;
				found = true;
				break;
			}
		}
		if (!found) {
			this.elections.push(election);
		}
	}

	private getById(id: string): Election {
		for (let i = 0; i < this.elections.length; i++) {
			if (id === this.elections[i]._id) {
				return this.elections[i];
			}
		}
		return null;
	}

	constructor(private http: Http) {
		this.serverUrl = environment.host + this.serverUrl;
	}

	getAllElections(): Promise<Election[]> {
		return this.http.get(this.serverUrl)
			.toPromise()
			.then((response) => {
				const objectReceived = response.json().data;
				for (let i = 0; i < objectReceived.length; i++) {
					objectReceived[i] = new Election(objectReceived[i]);
				}
				console.log(this.serviceName, 'getAllElections::success', objectReceived);
				this.elections = objectReceived;
				return objectReceived;
			});
	};

	findById(electionId: string) {
		if (electionId) {
			return new Promise((resolve, reject) => {
				const election = this.getById(electionId);
				if (election) {
					resolve(election);
				} else {
					this.http.get(this.serverUrl, {params: {electionId: electionId}})
						.toPromise()
						.then(
							response => {
								let objectReceived: Election = response.json().data;
								objectReceived = new Election(objectReceived);
								console.log(this.serviceName, 'findById::success', objectReceived);
								resolve(objectReceived);
							},
							error => {
								console.error(this.serviceName, 'findById::errorCallback', error);
								reject();
								return error.json();
							}
						).catch((error) => {
						console.error(this.serviceName, 'findById::errorCallback', error);
						return error.json();
					});
				}

			});
		} else {
			console.warn(this.serviceName, 'findById', 'electionId was null');
		}
	}

	create(election: Election) {
		if (election) {
			return this.http.post(this.serverUrl, election)
				.toPromise()
				.then(
					response => {
						let objectReceived: Election = response.json().data;
						objectReceived = new Election(objectReceived);
						console.log(this.serviceName, 'create::success', objectReceived);
						return objectReceived;
					},
					error => {
						console.error(this.serviceName, 'create::errorCallback', error);
					}
				).catch((error) => {
					console.error(this.serviceName, 'create::errorCallback', error);
				});
		} else {
			console.warn(this.serviceName, 'create', 'election was null');
		}
	};

	update(election: Election) {
		if (election && election._id) {
			return this.http.patch(this.serverUrl, election)
				.toPromise()
				.then(
					response => {
						let objectReceived: Election = response.json().data;
						objectReceived = new Election(objectReceived);
						console.log(this.serviceName, 'update::success', objectReceived);
						return objectReceived;
					},
					error => {
						console.error(this.serviceName, 'update::errorCallback', error);
					}
				);
		} else {
			console.warn(this.serviceName, 'update', 'election was null or _id was not defined');
		}
	};
}

