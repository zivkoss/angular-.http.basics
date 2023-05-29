import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData);
    this.http
      .post(
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
      .get('https://angular-http-basicsss-default-rtdb.firebaseio.com//posts.json')
      .subscribe(posts => {
        console.log(posts)
      });

    }    
}   