export class DashboardItem {
	_id: number;
	name: string;
	electionStrategy: string;
	dateFrom: Date;
	dateTo: Date;
	isDistrictElections?: boolean;
	numberOfDistricts?: number;
	candidatesStrategy: string;
	usersStrategy: string;
	userObjectConditions?: string;
}
