import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Curso } from 'src/app/core/models/curso.model';
import { Usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.scss']
})
export class UsuariosListComponent {
  @Input() data:Usuario[] =  [];
  @Output() onSelect:EventEmitter<Usuario> = new EventEmitter();
  @Output() onDelete:EventEmitter<Usuario> = new EventEmitter()
  public columns: string[] = ['nombreCompleto', 'username', 'role'];

}
