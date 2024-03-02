import { ListCursosComponent } from "./list-cursos.component";
import { TestBed } from '@angular/core/testing';
import { mockCourses } from "./testing/cursos.mock";


describe("Componente ListCursos del módulo Cursos", async () => {
    let component: ListCursosComponent
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [ListCursosComponent],
        });

        component = TestBed.createComponent(ListCursosComponent).componentInstance;
    })

    it(`Al llamar al método 'handleSelect' debería emitir un evento con el curso elegido`, () => {
        component.data = mockCourses;
        const spyOnHandleSelect = spyOn(component.onSelect, 'emit');
        component.handleSelect(component.data[0]);

        expect(spyOnHandleSelect).toHaveBeenCalledWith(component.data[0]);
    })

    it(`Al llamar al método 'handleDelete' debería emitir un evento con el curso elegido`, () => {
        component.data = mockCourses;
        const spyOnHandleSelect = spyOn(component.onDelete, 'emit');
        component.handleDelete(component.data[0]);

        expect(spyOnHandleSelect).toHaveBeenCalledWith(component.data[0]);
    })

    it("Las columnas de la lista de Alumnos deberían ser 'nombre', 'fechaInicio', 'fechaFin', 'actions'", () => {
        expect(component.columns).toContain('nombre');
        expect(component.columns).toContain('fechaInicio');
        expect(component.columns).toContain('fechaFin');
        expect(component.columns).toContain('actions');
    })

})