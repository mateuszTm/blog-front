import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { Profile } from '../dto/profile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profile = new Profile();

  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.profileService.getProfileById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
      }
    });
  }

  saveProfile(profile: Profile) {
    this.profileService.updateProfileById(this.activatedRoute.snapshot.paramMap.get('id'), profile).subscribe({
      next: (data) => {
        this.router.navigate(['panel', 'profiles']);
        }
    });
  }

  goToList() {
    this.router.navigate(['panel', 'profiles']);
  }
}
