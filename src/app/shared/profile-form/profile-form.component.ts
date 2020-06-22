import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Profile } from 'src/app/dto/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  formGroup: FormGroup;
  fcDesc: FormControl;
  fcActive: FormControl;
  private _profile: Profile;
  @Output() clickedSubmit = new EventEmitter<Profile>();
  @Output() clickedCancel = new EventEmitter<Profile>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fcDesc = new FormControl('');
    this.fcActive = new FormControl(true);
    this.formGroup = this.fb.group({
      description: this.fcDesc,
      active: this.fcActive
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
    this.profile.description = this.fcDesc.value;
    this.profile.active = this.fcActive.value;
    return this.profile;
  }

  runSave() {
    this.clickedSubmit.emit(this.getProfile());
  }

  runCancel() {
    this.clickedCancel.emit(this.getProfile());
  }
}
