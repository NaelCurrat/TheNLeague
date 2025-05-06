"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
let TeamService = class TeamService {
    constructor() {
        this.teams = [
            {
                id: '1',
                name: 'Manchester City',
                logo: '/assets/images/teams/mancity.png',
                championship: '/assets/images/championships/premierleague.png',
                countryFlag: '/assets/images/flags/gb.png'
            },
            {
                id: '2',
                name: 'Real Madrid',
                logo: '/assets/images/teams/realmadrid.png',
                championship: '/assets/images/championships/laliga.png',
                countryFlag: '/assets/images/flags/es.png'
            },
            {
                id: '3',
                name: 'Paris Saint-Germain',
                logo: '/assets/images/teams/psg.png',
                championship: '/assets/images/championships/ligue1.png',
                countryFlag: '/assets/images/flags/fr.png'
            },
            {
                id: '4',
                name: 'Bayern Munich',
                logo: '/assets/images/teams/bayern.png',
                championship: '/assets/images/championships/bundesliga.png',
                countryFlag: '/assets/images/flags/de.png'
            },
            {
                id: '5',
                name: 'Inter Milan',
                logo: '/assets/images/teams/inter.png',
                championship: '/assets/images/championships/seriea.png',
                countryFlag: '/assets/images/flags/it.png'
            },
            {
                id: '6',
                name: 'Benfica',
                logo: '/assets/images/teams/benfica.png',
                championship: '/assets/images/championships/ligaportugal.png',
                countryFlag: '/assets/images/flags/pt.png'
            },
            {
                id: '7',
                name: 'Young Boys',
                logo: '/assets/images/teams/youngboys.png',
                championship: '/assets/images/championships/superleague.png',
                countryFlag: '/assets/images/flags/ch.png'
            }
        ];
    }
    findAll() {
        return this.teams;
    }
    findOne(id) {
        const team = this.teams.find(team => team.id === id);
        return team || null;
    }
    create(team) {
        this.teams.push(team);
        return team;
    }
    update(id, updatedTeam) {
        const index = this.teams.findIndex(team => team.id === id);
        if (index === -1) {
            return null;
        }
        this.teams[index] = Object.assign(Object.assign({}, this.teams[index]), updatedTeam);
        return this.teams[index];
    }
    delete(id) {
        const index = this.teams.findIndex(team => team.id === id);
        if (index === -1) {
            return false;
        }
        this.teams.splice(index, 1);
        return true;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)()
], TeamService);
//# sourceMappingURL=team.service.js.map