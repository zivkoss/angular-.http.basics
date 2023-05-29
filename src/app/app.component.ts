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
    this.http
      .get<{ [key: string]: Post }>('https://angular-http-basicsss-default-rtdb.firebaseio.com//posts.json')
      .pipe(
         map(responseData => {
           const postArray: Post[] = [];
           for (const key in  responseData) {
             if (responseData.hasOwnProperty(key)) {
                postArray.push({ ...responseData[key], id: key });
             }
           }
           return postArray;
         })
        ) 
        .subscribe(posts => {
          //  console.log(posts)
          this.loadedPosts = posts;
        });

    }    
}   

