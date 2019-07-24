import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  post: Post;
  constructor(
    private postService: PostService, private location: Location, private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  addPost(title: string,description: string){
    if(!title && !description) return;
    this.postService.addPost({title, description} as Post).subscribe(
      () => this.toastr.success(`Add ${title} success`)
    ); 
  } 
  onBack(){
    this.location.back();
  }
}
