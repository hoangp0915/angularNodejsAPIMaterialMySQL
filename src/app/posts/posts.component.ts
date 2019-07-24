import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource,MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  panelOpenState = false;
  posts: Post[];
  dataSource: Post[];
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title','description', 'action'];
  searchKey: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  
  constructor(
    private postService: PostService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getPosts();
    
  }
  getPosts(){
    this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts;
        this.listData = new MatTableDataSource(posts);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    ) 
  }
  delete(id: number){
    this.postService.deletePost(id).subscribe(
      () => {
        this.toastr.success("Deleted!");
        this.getPosts();
      }
    )
  }
  clearKey(){
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter(): void{
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
