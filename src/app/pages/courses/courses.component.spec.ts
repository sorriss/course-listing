import {ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync} from '@angular/core/testing';

import {CoursesComponent} from './courses.component';
import {DebugElement} from "@angular/core";
import {CoursesService} from "./courses.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {COURSES} from "../../../../server/db-data";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {provideRouter} from "@angular/router";

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let el: DebugElement;
  let coursesService: jasmine.SpyObj<CoursesService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CoursesService', ['getData']);
    await TestBed.configureTestingModule({
      imports: [CoursesComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ]
    }).compileComponents()
      .then(() => {
        TestBed.overrideProvider(CoursesService, {useValue: spy});
        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses', fakeAsync(() => {
    coursesService.getData.and.returnValue(of(COURSES));
    flush();
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-mdc-row'));
    expect(coursesService.getData).toHaveBeenCalled();
    expect(tabs.length).toBe(6);
  }));

  it('should apply filter', () => {
    const stab = {
      search: 'test',
      filter: 'test'
    }
    component.selectedData = stab;
    component.applyFilter();
    expect(component.selectedData.search).toBe('');
    expect(component.selectedData.filter).toBe('test');
    expect(component.dataSource.filter).toBe('test');
  });

  it('should apply search', () => {
    const stab = {
      search: 'test',
      filter: 'test'
    }
    component.selectedData = stab;
    component.applySearch();
    expect(component.selectedData.filter).toBe('');
    expect(component.selectedData.search).toBe('test');
    expect(component.dataSource.filter).toBe('test');
  });


});
