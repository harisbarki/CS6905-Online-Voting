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
	selectedRole: string;

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


	login() {
		console.log(this.user);
		this.userService.login(this.user).then((user) => {
			console.log(user);
			this.router.navigate([this.router.url]);
		}).catch((err) => {
		});
	}

	automaticLogin() {
		const loginAs = this.selectedRole;
		const user = new User();
		user.password = 'test';
		if (loginAs === 'electionOfficial') {
			user.email = 'admin';
		} else if (loginAs === 'partyHead') {
			user.email = 'head1';
		} else if (loginAs === 'candidate') {
			user.email = 'candidate1';
		} else if (loginAs === 'voter') {
			user.email = 'voter1';
		}
		this.user = user;
		this.login();
	}

}
