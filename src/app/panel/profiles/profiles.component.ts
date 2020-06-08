import { Component, OnInit } from '@angular/core';
import { ResourcesPage } from 'src/app/dto/resources-page';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profilesPage = new ResourcesPage();

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getPage();
  }

  update(data: ResourcesPage) {
    this.profilesPage = data;
  }

  getPage(page?: number): void {
    this.profileService.getProfiles(page).subscribe({
      next: (data: ResourcesPage) => {
        this.update(data);
      }
    });
  }
}
