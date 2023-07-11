import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Post } from './post.model'
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.error = error.message;
      }
    );
  }  

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  
  }  

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, 
    error => {
       this.isFetching = false;
       this.error = error.message;
       console.log(error);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = []; // **
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}   

















// this.http
//       .get<{ [key: string]: Post }>(
//         'https://angular-http-basicsss-default-rtdb.firebaseio.com//posts.json'
//         )
//       .pipe(
//          map(responseData => {
//            const postsArray: Post[] = [];
//            for (const key in  responseData) {
//              if (responseData.hasOwnProperty(key)) {
//                 postsArray.push({ ...responseData[key], id: key });
//              }
//            }
//            return postsArray;
//          })
//         ) 
//         .subscribe(posts => {
//           this.isFetching = false;
//           this.loadedPosts = posts;
//         });