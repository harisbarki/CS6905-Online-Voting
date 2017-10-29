import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from './../../services';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
