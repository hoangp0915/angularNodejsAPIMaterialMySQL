import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
import { Post } from '../post';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  posts: Post;
  // post: Post;
  loading = false;
  constructor(private postService: PostService, private route: ActivatedRoute, 
    private location: Location,private toastr: ToastrService) { }
  
  ngOnInit() {
      this.getPost();
  }
  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.postService.getPost(id)
      .subscribe(posts => this.posts = posts);
  }
  onBack() {
    this.location.back();
  }
  save(title: string, description: string): void{
    this.loading = true;
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.updatePost({title, description} as Post, id).subscribe(
      () => {
        this.loading = false;
        this.onBack();
        this.toastr.success('Edit successfully!');
      }
    )
  }
}
