import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Team } from '../interfaces/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly API_URL = 'http://13.48.193.126:3000';
  private readonly TEAMS_ENDPOINT = '/teams';

  constructor(private http: HttpClient) {
    this.handleError = this.handleError.bind(this);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  private convertToTeam(data: any): Team {
    try {
      return {
        id: data.id,
        name: data.name,
        logo: new URL(data.logo, this.API_URL),
        championship: new URL(data.championship, this.API_URL),
        countryFlag: new URL(data.countryFlag, this.API_URL)
      };
    } catch (error) {
      console.error('Erreur lors de la conversion des URLs:', error);
      throw new Error('Format d\'URL invalide');
    }
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<any[]>(`${this.API_URL}${this.TEAMS_ENDPOINT}`).pipe(
      map(teams => teams.map(team => this.convertToTeam(team))),
      catchError(this.handleError)
    );
  }

  getTeam(id: string): Observable<Team> {
    if (!id) {
      return throwError(() => new Error('ID de l\'équipe requis'));
    }
    return this.http.get<any>(`${this.API_URL}${this.TEAMS_ENDPOINT}/${id}`).pipe(
      map(team => this.convertToTeam(team)),
      catchError(this.handleError)
    );
  }

  addTeam(team: Team): Observable<Team> {
    if (!team) {
      return throwError(() => new Error('Données de l\'équipe requises'));
    }
    const teamData = {
      ...team,
      logo: team.logo.toString(),
      championship: team.championship.toString(),
      countryFlag: team.countryFlag.toString()
    };
    return this.http.post<any>(`${this.API_URL}${this.TEAMS_ENDPOINT}`, teamData).pipe(
      map(newTeam => this.convertToTeam(newTeam)),
      catchError(this.handleError)
    );
  }

  updateTeam(team: Team): Observable<Team> {
    if (!team || !team.id) {
      return throwError(() => new Error('ID et données de l\'équipe requis'));
    }
    const teamData = {
      ...team,
      logo: team.logo.toString(),
      championship: team.championship.toString(),
      countryFlag: team.countryFlag.toString()
    };
    return this.http.put<any>(`${this.API_URL}${this.TEAMS_ENDPOINT}/${team.id}`, teamData).pipe(
      map(updatedTeam => this.convertToTeam(updatedTeam)),
      catchError(this.handleError)
    );
  }

  deleteTeam(id: string): Observable<void> {
    if (!id) {
      return throwError(() => new Error('ID de l\'équipe requis'));
    }
    return this.http.delete<void>(`${this.API_URL}${this.TEAMS_ENDPOINT}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
} 