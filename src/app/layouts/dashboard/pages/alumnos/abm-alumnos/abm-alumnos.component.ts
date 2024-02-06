import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { firstValueFrom } from 'rxjs';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Curso } from 'src/app/core/models/curso.model';
import { CursosService } from 'src/app/core/services/cursos.service';

interface IAbmAlumnosData {
  alumno:Alumno
};


@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss']
})
export class AbmAlumnosComponent implements OnInit {
  public alumno?:Alumno|null;
  public isEditable:boolean;
  public form:FormGroup;
  public persistio:boolean = false;
  public inscripcionesData:InscripcionDto[] = [];
  public cursosData:Curso[] = [];
  public cursosDisponibles:Curso[] = [];
  public cursoAInscribir:Curso|null = null;

  constructor(
    private alumnosService:AlumnosService,
    private inscripcionesService:InscripcionesService,
    private cursosService:CursosService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<AbmAlumnosComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data:IAbmAlumnosData
    ) {
    this.form = this.formBuilder.group({
      nombre:["", Validators.required],
      apellido:["", Validators.required],
      fechaNacimiento:["", Validators.required],
      telefono:["", Validators.required],
      email:["", [Validators.required, Validators.email]]
    })
    this.alumno = this.data?.alumno;
    console.log("ALUMNO: ", this.alumno);
    
    this.isEditable = !this.alumno;
  }

  async ngOnInit(): Promise<void> {
    this.setForm(this.alumno);
    await this.getCursosData();
    await this.getInscriptosData();
  }

  async getInscriptosData():Promise<void> {
    const data = await firstValueFrom(await this.inscripcionesService.getByAlumnoId(this.alumno?.id!));
    this.inscripcionesData = [...data]
    this.filtrarCursosDisponibles();
  }

  async getCursosData():Promise<void> {
    const data = await firstValueFrom(this.cursosService.getAll());
    this.cursosData = [...data]
  }

  filtrarCursosDisponibles():void {
    this.cursosDisponibles = this.cursosData.filter((curso:Curso) => {
      let estaDisponible:boolean = !this.inscripcionesData.find((inscr:InscripcionDto) => inscr.curso?.id === curso.id);
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
    alumno.id = this.data?.alumno?.id;

    return alumno;
  }

  async handleUpdate():Promise<void> {
    this.alumno = this.alumnoFromForm();
    console.log("updateAlumno - this.alumno: ", this.alumno);
    const id = this.data.alumno.id;

    try {
      this.alumno = await firstValueFrom(this.alumnosService.updateById(id!, this.alumno));
      this.toggleEdit();
      this.persistio = true;
    }
    catch (err){
      console.log("Error haciendo update del alumno ", id);
    }
  }

  async handleCreate():Promise<void> {
    let alumnoCreated:Alumno|null = this.alumnoFromForm();
    try {
      alumnoCreated = await firstValueFrom(this.alumnosService.create(alumnoCreated));
      console.log("Alumno creado: ", alumnoCreated);
      console.log("Alumnos: ", await firstValueFrom(this.alumnosService.getAll()));
      
      
      this.persistio = true;
      this.dialogRef.close(this.persistio);
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
      console.log("Deleted inscripcion: ", deleted);
      this.getInscriptosData();
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
      nuevaInscripcion.alumno = this.alumno || null;
      nuevaInscripcion.curso = curso || null;
      nuevaInscripcion.fechaInscripcion = new Date();
      
      const result = await firstValueFrom(await this.inscripcionesService.create(nuevaInscripcion));
      this.cursoAInscribir = null;
      await this.getInscriptosData();
    }
  }
}