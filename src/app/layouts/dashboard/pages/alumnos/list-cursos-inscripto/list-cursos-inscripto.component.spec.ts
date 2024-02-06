import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCursosInscriptoComponent } from './list-cursos-inscripto.component';

describe('ListCursosInscriptoComponent', () => {
  let component: ListCursosInscriptoComponent;
  let fixture: ComponentFixture<ListCursosInscriptoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCursosInscriptoComponent]
    });
    fixture = TestBed.createComponent(ListCursosInscriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
