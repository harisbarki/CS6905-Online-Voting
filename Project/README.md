# CS6905 Assignment 3
## Iteration 1

### MongoDB
### Express
### Angular 4
### NodeJS

## Start

Run `npm start` to run the prod version.</br>
Look in package.json for more npm scripts.</br>

## Build

Run `npm run build` to build the prod client. 
The build artifacts will be stored in the `server/client_dist/` directory.

## Description of Project
The vision of this project is to design generic Online-Voting system that will provide support for election officials to conduct an election (e.g. parliamentary, student union, sport club). This system design support popular election systems primarily winner takes all or proportional. If in case election officials decide to choose proportional election model then there is a threshold percentage votes to be achieved for a party to gain membership in a parliament. More than a one round of elections is possible. Additionally, the system shall provide directions to voting stations. For winner takes all, the election official can also select if the voter can select preference for candidates. After election the least popular candidate is dropped and votes re-assigned according to second choices, and so on, until one candidate has a majority of ballots. The election official will also be able to select districts participating in election and will be able to update the candidates. We have agreed that the program will be developed in NodeJS, the frontend in Angular and database would be MongoDB.


