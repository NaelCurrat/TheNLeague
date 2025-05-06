import { Team } from '../interfaces/team.interface';
export declare class TeamService {
    private teams;
    findAll(): Team[];
    findOne(id: string): Team | null;
    create(team: Team): Team;
    update(id: string, updatedTeam: Team): Team | null;
    delete(id: string): boolean;
}
