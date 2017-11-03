import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

import {environment} from '../../../environments/environment';
import {User} from './user';

@Injectable()
export class UserService {

	private serverUrl = '/api/user';
	private serviceName = 'UserService';
	loggedInChange: Subject<boolean> = new Subject<boolean>();

	urlLinks = {
		dashboard: () => {
			return '/dashboard';
		},
		login: () => {
			return '/login';
		},
		register: () => {
			return '/signup';
		},
		forgot: () => {
			return '/forgot';
		}
	};

	constructor(private http: Http) {
		this.serverUrl = environment.host + this.serverUrl;
	}

	login(loginUser: User) {
		if (loginUser) {
			return this.http.post(`${this.serverUrl}/login`, loginUser)
				.toPromise()
				.then(
					response => {
						const objectReceived = response.json();
						console.log(this.serviceName, 'postMessage::success', objectReceived);
						localStorage.setItem('token', objectReceived.data.token);
						this.loggedInChange.next(true);
						return objectReceived;
					},
					error => {
						console.error(this.serviceName, 'postMessage::errorCallback', error);
						throw error.json();
					}
				);
		} else {
			console.warn(this.serviceName, 'postMessage', 'loginUser was null');
		}
	};

	register(registerUser: User) {
		if (registerUser) {
			return this.http.post(`${this.serverUrl}/create`, registerUser)
				.toPromise()
				.then(
					response => {
						const objectReceived = response.json();
						console.log(this.serviceName, 'postMessage::success', objectReceived);
						localStorage.setItem('token', objectReceived.data.token);
						this.loggedInChange.next(true);
						return objectReceived;
					},
					error => {
						console.error(this.serviceName, 'postMessage::errorCallback', error);
						throw error.json();
					}
				);
		} else {
			console.warn(this.serviceName, 'postMessage', 'registerUser was null');
		}
	};

	loggedIn() {
		const tokenValid = tokenNotExpired();
		tokenValid ? this.loggedInChange.next(true) : this.loggedInChange.next(false);
		return tokenValid;
	}

	logout() {
		this.loggedInChange.next(false);
		localStorage.removeItem('token');
	}

	update(user: User) {
		if (user && user._id) {
			return this.http.put(this.serverUrl, user)
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
			console.warn(this.serviceName, 'update', 'user was null or _id was not defined');
		}
	};
}

