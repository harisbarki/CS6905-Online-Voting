import {DashboardItem} from './dashboard-item';

export const DASHBOARDITEMS: DashboardItem[] =
[
	{
		"_id": 213454,
		"name": "Provincial Election - NL",
		"electionStrategy": "Winner Takes All",
		"dateFrom": new Date("Thu Oct 13 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 31 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": true,
		"numberOfDistricts": 5,
		"candidatesStrategy": "predefined",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	},
	{
		"_id": 345644,
		"name": "Provincial Election - ON",
		"electionStrategy": "Proportional",
		"dateFrom": new Date("Thu Oct 13 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 31 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": true,
		"numberOfDistricts": 5,
		"candidatesStrategy": "predefined",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	},
	{
		"_id": 6645685,
		"name": "MUNSU Elections",
		"electionStrategy": "Winner Takes All",
		"dateFrom": new Date("Thu Oct 13 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 31 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": false,
		"numberOfDistricts": 0,
		"candidatesStrategy": "nomination",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	},
	{
		"_id": 23466,
		"name": "Provincial Election - BC",
		"electionStrategy": "Winner Takes All",
		"dateFrom": new Date("Thu Oct 02 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 11 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": true,
		"numberOfDistricts": 5,
		"candidatesStrategy": "predefined",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	},
	{
		"_id": 567443,
		"name": "Provincial Election - PE",
		"electionStrategy": "Winner Takes All",
		"dateFrom": new Date("Thu Oct 01 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 03 2017 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": true,
		"numberOfDistricts": 5,
		"candidatesStrategy": "predefined",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	},
	{
		"_id": 865575,
		"name": "Provincial Election - NB",
		"electionStrategy": "Winner Takes All",
		"dateFrom": new Date("Thu Oct 23 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 27 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": true,
		"numberOfDistricts": 5,
		"candidatesStrategy": "predefined",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	},
	{
		"_id": 563452,
		"name": "Provincial Election - NS",
		"electionStrategy": "Winner Takes All",
		"dateFrom": new Date("Thu Oct 24 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"dateTo": new Date("Thu Oct 29 2018 00:00:00 GMT-0230 (Newfoundland Daylight Time)"),
		"isDistrictElections": true,
		"numberOfDistricts": 5,
		"candidatesStrategy": "predefinedCandidates",
		"usersStrategy": "registeredUsers",
		"userObjectConditions": ""
	}
];
