import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCursosComponent } from './abm-cursos.component';

describe('AbmCursosComponent', () => {
  let component: AbmCursosComponent;
  let fixture: ComponentFixture<AbmCursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbmCursosComponent]
    });
    fixture = TestBed.createComponent(AbmCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
