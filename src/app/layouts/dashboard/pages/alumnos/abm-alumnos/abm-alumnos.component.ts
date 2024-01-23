import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno.model';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss']
})
export class AbmAlumnosComponent implements OnChanges {
  @Input() alumno?:Alumno;
  public isEditable:boolean;
  @Output() onSave:EventEmitter<Alumno> = new EventEmitter();
  @Output() onDelete:EventEmitter<Alumno> = new EventEmitter();

  public form:FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      nombre:["", Validators.required],
      apellido:["", Validators.required],
      fechaNacimiento:["", Validators.required],
      telefono:["", Validators.required],
      email:["", [Validators.required, Validators.email]]
    })
    // this.alumno ? this.form.disable() : this.form.enable();
    this.isEditable = !this.alumno;
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes["alumno"]) {
      this.setForm(this.alumno);    
      // this.alumno ? this.form.disable() : this.form.enable();
      this.isEditable = !this.alumno;
    }

    console.log("changes: ", changes);
    
    console.log("isEditable: ", this.isEditable);
    
  }

  setForm(alumno?:Alumno) {
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

    return alumno;
  }

  handleSave():void {
    let alumno:Alumno = {...this.alumnoFromForm(), id: this.alumno?.id || null};
    this.onSave.emit(alumno)
    this.isEditable = false;
  }

  handleEdit() {
    // this.form.enable();
    this.isEditable = true;  
  }

  handleCancel() {
    this.setForm(this.alumno);
    // this.alumno ? this.form.disable() : this.form.enable();
    this.isEditable = !this.alumno;
  }

  handleDelete() {
    this.onDelete.emit(this.alumno);
  }
}
