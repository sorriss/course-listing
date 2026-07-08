import { Component, OnDestroy, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CourseInterface } from '../../interfaces/course.interface';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  public dataSource: MatTableDataSource<CourseInterface> =
    new MatTableDataSource<CourseInterface>();
  public displayedColumns: string[] = ['id', 'imageUrl', 'name', 'status'];
  public filter$: BehaviorSubject<string[]> = this.coursesService.filter$;
  public selectedData = {
    filter: '',
    search: '',
  };

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.initData();
  }
  // all this logic of processing data should go to the service
  public applySearch(): void {
    // this does not work when you need to filter search results
    this.selectedData.filter = '';
    this.dataSource.filter = this.selectedData.search.trim().toLowerCase();
  }

  public applyFilter(): void {
    this.selectedData.search = '';
    this.dataSource.filter = this.selectedData.filter.trim().toLowerCase();
  }

  private initData(): void {
    this.coursesService
      .getData() // cold observable, no need to unsubscribe
      .subscribe((res) => {
        if (!res) return;
        this.dataSource = new MatTableDataSource(res);
      });
  }
}
