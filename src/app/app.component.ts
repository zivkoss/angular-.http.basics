import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model'
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }  

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  
  }  

  onFetchPosts() {
     this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-basicsss-default-rtdb.firebaseio.com//posts.json'
        )
      .pipe(
         map(responseData => {
           const postsArray: Post[] = [];
           for (const key in  responseData) {
             if (responseData.hasOwnProperty(key)) {
                postsArray.push({ ...responseData[key], id: key });
             }
           }
           return postsArray;
         })
        ) 
        .subscribe(posts => {
          this.isFetching = false;
          this.loadedPosts = posts;
        });

    }    
}   

