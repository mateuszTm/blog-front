import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../dto/post';
import { PostForm } from '../../dto/post-form';
import { ResourcesPage } from '../../dto/resources-page';
import { AbstractResourceService } from '../abstract-resource.service';


@Injectable({
  providedIn: 'root'
})
export class PostService extends AbstractResourceService {

  resourcePath = 'post';

  public getPostById(id: number | string): Observable<Post> {
    return this.getResourceById<Post>(id);
  }

  public getPosts(page?, sort = 'date,desc'): Observable<ResourcesPage> {
    return this.performGet<ResourcesPage>(
      this.getUrl(),
      null,
      this.getPaginationParams(sort, page)
    );
  }

  public addPost(postForm: PostForm): Observable<Post> {
    return this.createResource<Post>(postForm);
  }

  public editPost(id: number | string, post: PostForm): Observable<Post> {
    return this.updateResource<Post>(id, post);
  }

  public deletePost(id: number | string): Observable<any> {
    return this.deleteResource(id);
  }
}
