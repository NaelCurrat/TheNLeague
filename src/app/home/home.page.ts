import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { TeamService } from '../services/team.service';
import { Team } from '../interfaces/team.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  teams: Team[] = [];
  loading = false;
  error: string | null = null;
  private readonly API_URL = 'http://13.48.193.126:3000';

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.loading = true;
    this.error = null;
    this.teamService.getTeams().subscribe({
      next: (teams) => {
        this.teams = teams.map(team => ({
          ...team,
          logo: new URL(`/assets/images/teams/${team.logo.pathname.split('/').pop()}`, this.API_URL),
          championship: new URL(`/assets/images/championships/${team.championship.pathname.split('/').pop()}`, this.API_URL),
          countryFlag: new URL(`/assets/images/flags/${team.countryFlag.pathname.split('/').pop()}`, this.API_URL)
        }));
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }
}
