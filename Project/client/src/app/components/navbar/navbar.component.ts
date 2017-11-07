import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {User, UserService} from './../../services';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

	loggedIn: boolean;
	user: User;
	loginSubscription: any;

	constructor(private router: Router, private userService: UserService) {

		this.loggedIn = this.userService.loggedIn();
		this.user = this.userService.loggedInUser;
		this.loginSubscription = userService.loggedInChange.subscribe((value) => {
			this.user = this.userService.loggedInUser;
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
