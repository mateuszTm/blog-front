import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Profile } from 'src/app/dto/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  formGroup: FormGroup;
  private _profile: Profile;
  @Output() clickedSubmit = new EventEmitter<Profile>();
  @Output() clickedCancel = new EventEmitter<Profile>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      description: [''],
      active: []
    });
  }

  @Input()
  set profile(profile: Profile) {
    this._profile = profile;
    this.setFormValues(profile);
  }

  get profile() {
    return this._profile;
  }

  setFormValues(profile: Profile){
    if (this.formGroup) {
      this.formGroup.patchValue({
        description: profile.description,
        active: profile.active
      });
    }
  }

  getProfile() {
    this.profile.description = this.formGroup.get('description').value;
    this.profile.active = this.formGroup.get('active').value;
    return this.profile;
  }

  runSave() {
    this.clickedSubmit.emit(this.getProfile());
  }

  runCancel() {
    this.clickedCancel.emit(this.getProfile());
  }
}
