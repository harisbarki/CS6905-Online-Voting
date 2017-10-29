import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from './../../services';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
	loggedIn: boolean;
	loginSubscription: any;

	constructor (private router: Router, private userService: UserService){

		this.loggedIn = this.userService.loggedIn;

		this.loginSubscription = userService.loggedInChange.subscribe((value) => {
			this.loggedIn = value;
		});
	}

	ngOnDestroy() {
		this.loginSubscription.unsubscribe();
	}

	logout() {
		this.userService.logout();
		this.router.navigate(['/']);
	}

}
