import { Injectable } from '@angular/core';
import { ResourcesPage } from '../dto/resources-page';
import { Observable } from 'rxjs';
import { Profile } from '../dto/profile';
import { AbstractResourceService } from './abstract-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractResourceService{

  resourcePath = 'profile';

  public getCurrentUserPosts(page?, sort = 'date,desc'): Observable<ResourcesPage> {
    return this.performGet<ResourcesPage>(
      this.getUrl('post'),
      this.getHeaders(ProfileService.HEADER_AUTH),
      this.getPaginationParams(sort, page)
    );
  }

  public getCurrentUserProfile(): Observable<Profile> {
    return this.performGet<Profile>(
      this.getUrl(),
      this.getHeaders(ProfileService.HEADER_AUTH)
    );
  }

  public getProfiles(page?, sort = 'id,desc'): Observable<ResourcesPage> {
    return this.performGet<ResourcesPage>(
      this.getUrl('list'),
      this.getHeaders(ProfileService.HEADER_AUTH),
      this.getPaginationParams(sort, page)
    );
  }

  public getProfileById(id: number|string): Observable<Profile> {
    return this.getResourceById<Profile>(id, true);
  }

  public editProfileById(id: number|string, profile: Profile): Observable<Profile> {
    return this.updateResource<Profile>(id, profile);
  }

  public deleteProfile(id: number | string): Observable<any> {
    return this.deleteResource(id);
  }
}
