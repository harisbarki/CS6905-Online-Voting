import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {DashboardItem} from './dashboard-item';
import {DASHBOARDITEMS} from './mock-dashboard-items';

@Component({
	selector: 'app-login-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	elections: DashboardItem[];
	currentElections: DashboardItem[];
	futureElections: DashboardItem[];
	pastElections: DashboardItem[];

	constructor(private router: Router) {

	}

	ngOnInit() {
		this.elections = DASHBOARDITEMS;
		this.currentElections = [];
		this.futureElections = [];
		this.pastElections = [];
		let currentDate = new Date();

		for (let i = 0; i < this.elections.length; i++) {
			if(this.elections[i].dateTo < currentDate) {
				this.pastElections.push(this.elections[i]);
			} else if(this.elections[i].dateFrom > currentDate) {
				this.futureElections.push(this.elections[i]);
			} else {
				this.currentElections.push(this.elections[i]);
			}
		}

	}

	electionEdit(election) {
		this.router.navigate(['/election/' + election._id + '/edit']);
	}

	electionDetails(election) {
		this.router.navigate(['/election/' + election._id + '/details']);
	}

	nominateCandidate(election) {
		this.router.navigate(['/election/' + election._id + '/nominate-candidate']);
	}

}
