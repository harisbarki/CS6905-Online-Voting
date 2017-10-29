import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserService {

	loggedIn: boolean;
	loggedInChange: Subject<boolean> = new Subject<boolean>();

	constructor() {
		this.loggedIn = (localStorage.getItem('loggedIn') === 'true');
	}

	login(): boolean {
		this.loggedIn = true;
		this.loggedInChange.next(this.loggedIn);
		localStorage.setItem('loggedIn', 'true')
		return true;
	};

	logout(): boolean {
		this.loggedIn = false;
		this.loggedInChange.next(this.loggedIn);
		localStorage.setItem('loggedIn', 'false')
		return true;
	}
}

