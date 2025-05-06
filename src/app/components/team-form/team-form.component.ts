import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TeamFormComponent implements OnInit {
  @Input() team?: Team;
  @Output() submitForm = new EventEmitter<Team>();

  formData: Partial<Team> = {
    name: '',
    logo: '',
    championship: '',
    countryFlag: ''
  };

  isEditing = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.team) {
      this.formData = { ...this.team };
      this.isEditing = true;
    }
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (this.isFormValid()) {
      this.submitForm.emit(this.formData as Team);
    }
  }

  isFormValid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.logo &&
      this.formData.championship &&
      this.formData.countryFlag
    );
  }
} 