import { TeamService } from '../services/team.service';
import { Team } from '../interfaces/team.interface';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    findAll(): Team[];
    findOne(id: string): Team | null;
    create(team: Team): Team;
    update(id: string, team: Team): Team | null;
    delete(id: string): boolean;
}
