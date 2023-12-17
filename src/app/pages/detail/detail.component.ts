import {Component, Input, inject, OnChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './detail.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CourseDetailInterface,
  InstructorInterface,
} from '../../interfaces/course.interface';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, Subject, firstValueFrom, of } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    AsyncPipe,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    NgIf,
    MatChipsModule,
    NgOptimizedImage,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  @Input() id: string = '';
  private detailService = inject(DetailService);
  public course$!: Observable<CourseDetailInterface>;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  ngOnInit() {
    debugger
    this.course$ = this.detailService.getData(this.id);
  }

  public async add(event: MatChipInputEvent): Promise<void> {
    const value = (event.value || '').trim();
    const course = await firstValueFrom(this.course$)
    if (value) {
      course.instructors.push({ name: value, image: '' });
      this.course$ = of(course);
    }
    event.chipInput!.clear();
  }

  public async remove(instructor: InstructorInterface): Promise<void> {
    const course = await firstValueFrom(this.course$)
    const index = course.instructors.indexOf(instructor);
    if (index >= 0) {
      course.instructors.splice(index, 1);
      this.course$ = of(course);
    }
  }

  public async edit(instructor: InstructorInterface, event: MatChipEditedEvent) {
    const course = await firstValueFrom(this.course$)
    const value = event.value.trim();
    if (!value) {
      this.remove(instructor);
      return;
    }
    const index = course.instructors.indexOf(instructor);
    if (index >= 0) {
      course.instructors[index].name = value;
      this.course$ = of(course);
    }
  }
}
