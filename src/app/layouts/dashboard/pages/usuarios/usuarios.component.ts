import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Usuario } from 'src/app/core/models/usuario.model';
import { UsuariosService } from 'src/app/core/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  data:Usuario[] = [];

  constructor(
    private usuariosService:UsuariosService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData():Promise<void> {
    this.data = await firstValueFrom(this.usuariosService.getAll());
  }
}
