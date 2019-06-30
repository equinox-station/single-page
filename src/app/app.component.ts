import { Component, ChangeDetectorRef } from '@angular/core';
import { Json } from './json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formUser: User = new User();
  listUser: User[] = [];
  url = "https://eegi.herokuapp.com/usuarios"

  constructor(private ref: ChangeDetectorRef, private jsonService: Json) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.jsonService.getContent(this.url)
		.subscribe(
			async data => {
        await this.setListUser(<User[]> data);
        this.ref.detectChanges();
			},
			error => {
				console.log('Erro: não foi possível ler os dados JSON.');
				console.log(error);
			}
		);
  }

  postUser(usuario: User) {
    this.jsonService.postContent(this.url, usuario)
			.subscribe(
				async data => {
          await console.log(data);
          this.getUsers();
				},
				error => {
					alert("Erro ao inserir usuário.");
					console.log(error);
				}
			);
  }

  updateUser(usuario: User) {
    this.jsonService.updateContent(this.url, usuario)
			.subscribe(
				async data => {
          await console.log(data);
          this.getUsers();
				},
				error => {
					alert("Erro ao atualizar usuário.");
					console.log(error);
				}
			);
  }

  deleteUser(id: number) {
    this.jsonService.deleteContent(this.url + "/" + id)
			.subscribe(
				async data => {
          await console.log(data);
          this.getUsers();
				},
				error => {
					alert("Erro ao deletar usuário.");
					console.log(error);
				}
			);
  }

  modifyUser(usuario: User) {
    if (usuario.id > 0) this.updateUser(usuario);
    else this.postUser(usuario);
  }

  setListUser(listUser: User[]) {
    this.listUser = listUser;
    this.listUser.sort((a,b) => a.nome.localeCompare(b.nome));
  }

  copy(id: number) {
    this.formUser.id = id;
    this.formUser.login = document.getElementById('login' + id).innerHTML;
    this.formUser.nome = document.getElementById('nome' + id).innerHTML;
    this.formUser.cargo = document.getElementById('cargo' + id).innerHTML;
    this.formUser.telefone = document.getElementById('telefone' + id).innerHTML;
    
    this.modificarAcao(1);
  }
  
  clear() {
    this.formUser.id = 0;
    this.formUser.login = "";
    this.formUser.nome = "";
    this.formUser.cargo = "";
    this.formUser.telefone = "";
  }
  
  startnew() {
    this.clear()
    this.modificarAcao(0);
  }
  
  modificarAcao(tipo: number) {
    if (tipo == 0) document.getElementById('tipoAcao').innerHTML = "Inserir";
    else document.getElementById('tipoAcao').innerHTML = "Modificar";
  }
}

// pequena classe modelo para essa aplicação
export class User {
  constructor(id?: number, login?: string, nome?: string, cargo?: string, telefone?: string) {
    this.id = id;
    this.login = login;
    this.nome = nome;
    this.cargo = cargo;
    this.telefone = telefone;
    this.foto = null;
    this.role = 'USER';
  }

  id: number;
  login: string;
  nome: string;
  cargo: string;
  telefone: string;
  foto: string;
  role: string;
}