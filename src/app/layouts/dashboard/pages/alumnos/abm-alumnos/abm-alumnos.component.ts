import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from 'src/app/core/models/alumno.model';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { firstValueFrom } from 'rxjs';

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

  constructor(
    private alumnosService:AlumnosService,
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
    // this.alumno ? this.form.disable() : this.form.enable();
    this.alumno = this.data?.alumno;
    console.log("ALUMNO: ", this.alumno);
    
    this.isEditable = !this.alumno;
  }

  ngOnInit(): void {
    this.setForm(this.alumno);
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

}