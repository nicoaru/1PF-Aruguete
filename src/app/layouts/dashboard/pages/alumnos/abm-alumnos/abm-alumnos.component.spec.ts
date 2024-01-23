import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmAlumnosComponent } from './abm-alumnos.component';

describe('AbmAlumnosComponent', () => {
  let component: AbmAlumnosComponent;
  let fixture: ComponentFixture<AbmAlumnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmAlumnosComponent]
    });
    fixture = TestBed.createComponent(AbmAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
