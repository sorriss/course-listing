import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetailService} from "./detail.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CourseDetailInterface, InstructorInterface} from "../../interfaces/course.interface";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatFormFieldModule, MatIconModule, AsyncPipe, MatOptionModule, MatSelectModule, NgForOf, NgIf, MatChipsModule],
  providers: [DetailService],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  public course: CourseDetailInterface = {} as CourseDetailInterface;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private route: ActivatedRoute,
              private detailService: DetailService) {
    this.initData();
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.course.instructors.push({name: value, image: ''});
    }
    event.chipInput!.clear();
  }

  public remove(instructor: InstructorInterface): void {
    const index = this.course.instructors.indexOf(instructor);
    if (index >= 0) {
      this.course.instructors.splice(index, 1);
    }
  }

  public edit(instructor: InstructorInterface, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(instructor);
      return;
    }
    const index = this.course.instructors.indexOf(instructor);
    if (index >= 0) {
      this.course.instructors[index].name = value;
    }
  }

  private initData(): void {
    const pageId = this.route.snapshot.params['id'];
    this.detailService.getData(pageId)
      .pipe(takeUntilDestroyed())
      .subscribe(res => {
        if (!res) return;
        this.course = res;
        console.log(this.course)
      });
  }

}
