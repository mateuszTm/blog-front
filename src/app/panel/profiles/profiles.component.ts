import { Component, OnInit } from '@angular/core';
import { ResourcesPage } from 'src/app/dto/resources-page';
import { ProfileService } from 'src/app/services/profile.service';
import { HttpParams } from '@angular/common/http';

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
    console.log(data.content);
  }

  getPage(httpParams?: HttpParams): void {
    this.profileService.getProfiles(httpParams).subscribe({
      next: (data: ResourcesPage) => {
        this.update(data);
      }
    });
  }
}
