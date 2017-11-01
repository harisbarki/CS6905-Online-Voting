import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Election} from './election';
import {environment} from '../../../environments/environment';

@Injectable()
export class ElectionService {

	private serverUrl = '/api/election';
	private serviceName = 'ElectionService';
	urls = {
		dashboard: () => {
			return '/dashboard';
		}
	};

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
				return objectReceived;
			});
	};

	findById(electionId: string) {
		if (electionId) {
			return this.http.get(this.serverUrl, {params: {electionId: electionId}})
				.toPromise()
				.then(
					response => {
						let objectReceived: Election = response.json().data[0];
						objectReceived = new Election(objectReceived);
						console.log(this.serviceName, 'findById::success', objectReceived);
						return objectReceived;
					},
					error => {
						console.error(this.serviceName, 'findById::errorCallback', error);
					}
				).catch((error) => {
					console.error(this.serviceName, 'findById::errorCallback', error);
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
						const objectReceived: Election = response.json();
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
						const objectReceived = response.json();
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

