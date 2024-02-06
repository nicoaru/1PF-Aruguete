import { Injectable } from '@angular/core';
import { Inscripcion } from '../models/inscripcion.model';
import { UtilsService } from './utils.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { InscripcionDto } from '../models/inscripcion.dto';
import { CursosService } from './cursos.service';
import { AlumnosService } from './alumnos.service';



@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripcionesData:Inscripcion[] = [];
  private lastId:number;

  constructor(
    private utilsService:UtilsService,
    private cursosService:CursosService,
    private alumnosService:AlumnosService
  ) {
    this.inscripcionesData = this.generateInscripciones(10);
    this.lastId = this.inscripcionesData.sort((a:Inscripcion, b:Inscripcion) => a.id! - b.id!)[this.inscripcionesData.length-1].id!;

    console.log("Inscripciones: ", this.inscripcionesData);
    
  }

  private generateInscripciones = (n:number):Inscripcion[] => {
    const fechaInicioInscripciones = new Date(new Date().setMonth(new Date().getMonth() - 3));
    const data:Inscripcion[] = [];
    
    for (let ix = 0; ix < n; ix++) {
      let nuevaInscripcion:Inscripcion;
      let yaInscripto:boolean = false;

      do {     
        nuevaInscripcion = new Inscripcion;   
        nuevaInscripcion.id = ix+1;
        nuevaInscripcion.idAlumno = Math.ceil(Math.random()*4);
        nuevaInscripcion.idCurso = Math.ceil(Math.random()*4);
        nuevaInscripcion.fechaInscripcion = this.utilsService.generateRandomDate(fechaInicioInscripciones, new Date());

        yaInscripto = !!data.find((elem:Inscripcion) => elem.idAlumno === nuevaInscripcion.idAlumno && elem.idCurso === nuevaInscripcion.idCurso);
      } while (yaInscripto)
      
      data.push(nuevaInscripcion);
    }
    return data;
  }

  private async toDto(entity:Inscripcion):Promise<InscripcionDto> {
    const dto = new InscripcionDto;
    dto.id = entity.id;
    dto.alumno = entity.idAlumno ? await firstValueFrom(this.alumnosService.getById(entity.idAlumno)) : null;
    dto.curso = entity.idCurso ? await firstValueFrom(this.cursosService.getById(entity.idCurso)) : null;
    dto.fechaInscripcion = entity.fechaInscripcion;
    return dto;
  }

  private async toDtoArray(entityList:Inscripcion[]):Promise<InscripcionDto[]> {
    console.log("EntityList: ", entityList);
    
    const dtoList:InscripcionDto[] = await Promise.all(entityList?.map(async (elem) => await this.toDto(elem)));

    return dtoList;
  }

  async getAll():Promise<Observable<InscripcionDto[]>> {
    console.log("Inscripciones Data en service: ", this.inscripcionesData);
    const result:InscripcionDto[] = await this.toDtoArray(this.inscripcionesData);
    console.log("Result: ", result);
    
    return of(result);
  }

  async getById(id:number):Promise<Observable<InscripcionDto|null>> {
    const inscripcion:Inscripcion|null = this.inscripcionesData.find(elem => elem.id === id) || null;
    if(!inscripcion) return of(null);
    return of(await this.toDto(inscripcion));
  }

  async getByAlumnoId(idAlumno:number):Promise<Observable<InscripcionDto[]>> {
    const inscripciones:Inscripcion[]|null = this.inscripcionesData.filter(elem => elem.idAlumno === idAlumno) || null;
    return of(await this.toDtoArray(inscripciones));
  }

  async getByCursoId(idCurso:number):Promise<Observable<InscripcionDto[]>> {
    const inscripciones:Inscripcion[]|null = this.inscripcionesData.filter(elem => elem.idCurso === idCurso) || null;
    return of(await this.toDtoArray(inscripciones));
  }

  async create(inscripcionDto:InscripcionDto):Promise<Observable<InscripcionDto|null>> {
    const inscripcion:Inscripcion = InscripcionDto.toEntity(inscripcionDto);
    inscripcion.id = this.lastId+1;
    this.lastId++;
    this.inscripcionesData.push(inscripcion);

    return of(await this.toDto(inscripcion));
  }

  async deleteById(id:number):Promise<Observable<InscripcionDto|null>> {
    const ix:number = this.inscripcionesData.findIndex(elem => elem.id === id);
    console.log("## ix to delete: ", ix);
    
    const inscripcionDeleted:Inscripcion|null = this.inscripcionesData.splice(ix, 1)[0];
    console.log("InscripcionesData en service: ", this.inscripcionesData);
    
    return of(await this.toDto(inscripcionDeleted));
  }

  async updateById(id:number, inscripcionUpdated:InscripcionDto):Promise<Observable<InscripcionDto|null>> {
    const ix:number = this.inscripcionesData.findIndex(elem => elem.id! === id);

    if(ix >= 0) {
      inscripcionUpdated.id = id;
      this.inscripcionesData.splice(ix, 1, InscripcionDto.toEntity(inscripcionUpdated))
      return of(inscripcionUpdated);
    }
    else {
      return of(null);
    }
  }

}
