import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFatching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }  
    // Send Http request
  onCreatePost(postData: Post) {
    // console.log(postData);
    this.http
      .post<{ name: string }>(
      'https://angular-http-basicsss-default-rtdb.firebaseio.com//posts.json',
       postData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts() {
     this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFatching = true;
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
          //  console.log(posts)
          this.loadedPosts = posts;
        });

    }    
}   

