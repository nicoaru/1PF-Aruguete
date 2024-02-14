import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Curso } from 'src/app/core/models/curso.model';
import { InscripcionDto } from 'src/app/core/models/inscripcion.dto';
import { CursosService } from 'src/app/core/services/cursos.service';
import { InscripcionesService } from './../../../../../core/services/inscripciones.service';
import { Inscripcion } from 'src/app/core/models/inscripcion.model';

interface IAbmCursoData {
  curso:Curso
};

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss']
})
export class AbmCursosComponent {
  public curso?:Curso|null;
  public isEditable:boolean;
  public form:FormGroup;
  public persistio:boolean = false;
  public inscripcionesData:InscripcionDto[] = [];


  constructor(
    private cursosService:CursosService,
    private inscripcionesService:InscripcionesService,
    private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<AbmCursosComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data:IAbmCursoData
    ) {
    this.form = this.formBuilder.group({
      nombre:["", Validators.required],
      descripcion:["", Validators.required],
      fechaInicio:["", Validators.required],
      fechaFin:["", Validators.required]
    })
    this.curso = this.data?.curso;
    console.log("CURSO: ", this.curso);
    
    this.isEditable = !this.curso;
  }

  ngOnInit(): void {
    this.setForm(this.curso);
    this.getInscriptosData();
  }

  async getInscriptosData():Promise<void> {
    const data = await firstValueFrom(this.inscripcionesService.getByCursoId(this.curso?.id!));
    this.inscripcionesData = [...data]
    console.log("Inscriptos data: ", this.inscripcionesData);
  }

  toggleEdit():void {
    this.isEditable = !this.isEditable;
  }

  setForm(curso?:Curso|null) {
    if(!curso) {
      this.form.reset();
      return;
    }
    this.form.get("nombre")?.setValue(curso.nombre);
    this.form.get("descripcion")?.setValue(curso.descripcion);
    this.form.get("fechaInicio")?.setValue(curso.fechaInicio);
    this.form.get("fechaFin")?.setValue(curso.fechaFin);
  }

  cursoFromForm():Curso {
    let curso:Curso = new Curso();
    curso.nombre = this.form.get("nombre")?.value;
    curso.descripcion = this.form.get("descripcion")?.value;
    curso.fechaInicio = this.form.get("fechaInicio")?.value;
    curso.fechaFin = this.form.get("fechaFin")?.value;
    curso.id = this.data?.curso?.id;

    return curso;
  }

  async handleUpdate():Promise<void> {
    const cursoUpdated = this.cursoFromForm();
    console.log("updateCurso - this.curso: ", this.curso);
    const id = this.data.curso.id;

    try {
      this.curso = await firstValueFrom(this.cursosService.updateById(id!, cursoUpdated));
      this.toggleEdit();
      this.persistio = true;
    }
    catch (err){
      console.log("Error haciendo update del curso ", id);
    }
  }

  async handleCreate():Promise<void> {
    let cursoCreated:Curso|null = this.cursoFromForm();
    try {
      cursoCreated = await firstValueFrom(this.cursosService.create(cursoCreated));
      console.log("Curso creado: ", cursoCreated);
      console.log("Cursos: ", await firstValueFrom(this.cursosService.getAll()));
      
      
      this.persistio = true;
      this.dialogRef.close(this.persistio);
    }
    catch (err){
      console.log("Error creando curso");
    }
  }

  undoChanges() {
    this.setForm(this.curso);
  }

  async handleDeleteInscripto(id:number):Promise<void> {
    try {
      const deleted:InscripcionDto|null = await firstValueFrom(await this.inscripcionesService.deleteById(id));
      console.log("Deleted inscripcion: ", deleted);
      this.getInscriptosData();
    }
    catch (err:any) {
      console.log("Error eliminando inscripción: ", err.message);
      
    }
  }

}
