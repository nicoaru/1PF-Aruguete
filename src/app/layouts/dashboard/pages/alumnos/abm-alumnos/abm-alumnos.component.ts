import { Component, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Curso } from 'src/app/core/models/curso.model';
import { CursosService } from 'src/app/core/services/cursos.service';
import { Store } from '@ngrx/store';
import { AlumnosSelectors } from '../redux/alumnos.selectors';
import { AlumnosActions } from '../redux/alumnos.actions';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss']
})
export class AbmAlumnosComponent implements OnInit, OnDestroy {
  // REDUX
  alumno?:Alumno;
  inscripcionesData:InscripcionDto[] = [];
  cursosData:Curso[] = [];
  //

  cursosDisponibles:Curso[] = [];
  cursoAInscribir:Curso|null = null;
  
  isEditable:boolean;
  form:FormGroup;
  destroyedComponent$:Subject<boolean> = new Subject();

  constructor(
    private store:Store,
    private alumnosService:AlumnosService,
    private inscripcionesService:InscripcionesService,
    private cursosService:CursosService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<AbmAlumnosComponent, boolean>,
  ) {
    // REDUX
    this.store.select(AlumnosSelectors.selectState)
      .pipe(takeUntil(this.destroyedComponent$))
      .subscribe({
        next: state => {
          this.alumno = state.selectedAlumno;
          this.inscripcionesData = state.inscripcionesData;
          this.cursosData = state.cursosData;
        }
      })
    //

    // REACTIVE FORM
    this.form = this.formBuilder.group({
      nombre:["", Validators.required],
      apellido:["", Validators.required],
      fechaNacimiento:["", Validators.required],
      telefono:["", Validators.required],
      email:["", [Validators.required, Validators.email]]
    })
    //

    this.isEditable = !this.alumno;

  }

  async ngOnInit(): Promise<void> {
    this.setForm(this.alumno);
    await this.getCursosData();
    await this.getCursosInscriptoData();
  }

  async getCursosInscriptoData():Promise<void> {
    this.store.dispatch(AlumnosActions.setInscripcionesData({ inscripcionesData: await firstValueFrom( this.inscripcionesService.getByAlumnoId(this.alumno?.id!)) }))
    
    this.filtrarCursosDisponibles();
  }

  async getCursosData():Promise<void> {
    this.store.dispatch(AlumnosActions.setCursosData({ cursosData: await firstValueFrom(this.cursosService.getAll()) }))
  }

  filtrarCursosDisponibles():void {
    this.cursosDisponibles = this.cursosData.filter((curso:Curso) => {
      let estaDisponible:boolean = !this.inscripcionesData.find((inscr:InscripcionDto) => inscr.course?.id === curso.id);
      return estaDisponible;
    })
  }

  toggleEdit():void {
    this.isEditable = !this.isEditable;
  }

  setForm(alumno?:Alumno|null) {
    if(!alumno) {
      this.form.reset();
      return;
    }
    this.form.get("nombre")?.setValue(alumno.nombre);
    this.form.get("apellido")?.setValue(alumno.apellido);
    this.form.get("fechaNacimiento")?.setValue(alumno.fechaNacimiento);
    this.form.get("telefono")?.setValue(alumno.telefono);
    this.form.get("email")?.setValue(alumno.email);
  }

  alumnoFromForm():Alumno {
    let alumno:Alumno = new Alumno();
    alumno.nombre = this.form.get("nombre")?.value;
    alumno.apellido = this.form.get("apellido")?.value;
    alumno.fechaNacimiento = this.form.get("fechaNacimiento")?.value;
    alumno.telefono = this.form.get("telefono")?.value;
    alumno.email = this.form.get("email")?.value;
    alumno.id = this.alumno?.id || null;

    return alumno;
  }

  async handleUpdate():Promise<void> {
    this.alumno = this.alumnoFromForm();
    const id = this.alumno.id;

    try {
      this.store.dispatch(AlumnosActions.setSelectedAlumno({ selectedAlumno: await firstValueFrom(this.alumnosService.updateById(id!, this.alumno)) }))

      this.toggleEdit();
    }
    catch (err){
      console.log("Error haciendo update del alumno ", id);
    }
  }

  async handleCreate():Promise<void> {
    let alumnoCreated:Alumno|null = this.alumnoFromForm();
    try {
      alumnoCreated = await firstValueFrom(this.alumnosService.create(alumnoCreated));

      this.dialogRef.close();
    }
    catch (err){
      console.log("Error creando alumno");
    }
  }

  undoChanges() {
    this.setForm(this.alumno);
  }

  async handleDeleteInscripcion(id:number):Promise<void> {
    try {
      const deleted:InscripcionDto|null = await firstValueFrom(await this.inscripcionesService.deleteById(id));
      this.getCursosInscriptoData();
    }
    catch (err:any) {
      console.log("Error eliminando inscripción: ", err.message);
    }
  }

  async handleInscribir(curso:Curso|null):Promise<void> {
    if(!curso) {
      return;
    }
    else {
      const nuevaInscripcion:InscripcionDto = new InscripcionDto;
      nuevaInscripcion.student = this.alumno || null;
      nuevaInscripcion.course = curso || null;
      nuevaInscripcion.fechaInscripcion = new Date();
      
      const result = await firstValueFrom(this.inscripcionesService.create(nuevaInscripcion));
      this.cursoAInscribir = null;
      await this.getCursosInscriptoData();
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(AlumnosActions.setSelectedAlumno({}));
    this.destroyedComponent$.next(true);
    this.destroyedComponent$.complete();
  }
}