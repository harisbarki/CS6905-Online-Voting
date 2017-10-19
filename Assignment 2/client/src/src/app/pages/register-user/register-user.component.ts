import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from './../../services';

@Component({
	selector: 'app-register-user',
	templateUrl: './register-user.component.html',
	styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

	constructor(private router: Router, private userService: UserService) {

	}

	ngOnInit() {

	}

	login() {
		console.log('hello');
		this.userService.login();
		this.router.navigate(['/dashboard']);
	}
}
