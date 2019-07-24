import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable, from } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http'

const httpOption = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlAPI: string = "http://localhost:8000/posts";
  constructor(
    private http: HttpClient
  ) { }
  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.urlAPI).pipe(
      tap(data => JSON.stringify(data))
    )
  }
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.urlAPI}/${id}/`);
  }
  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.urlAPI, post, httpOption);
  }
  deletePost(id: number):Observable<Post>{
    return this.http.delete<Post>(`${this.urlAPI}/${id}`,httpOption);
  }
  updatePost(post: Post, id:number): Observable<Post>{
    return this.http.put<Post>(`${this.urlAPI}/${id}`,post,httpOption);
  }
}
