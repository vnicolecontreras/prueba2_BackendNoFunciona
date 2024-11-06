import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Interfaces/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  // API PARA AUTENTICARSE
  private api_autenticacion = "https://dummyjson.com/auth/login";

  constructor(
    // Servicio para hacer solicitudes HTTP
    private http: HttpClient
  ) { }

  // METODO PARA LOGUEARSE EN LA PAGINA CON LA API
  iniciar_sesion(username: string, password: string){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = { username, password }
    return this.http.post<User>(this.api_autenticacion, body, { headers })
  }

  // LOCAL STORAGE

  // Cerrar sesion removiendo el token del LocalStorage
  cerrar_sesion(){
    localStorage.removeItem('accessToken')
  }

  // Guardar localmente el token en el localStorage
  guardar_token(token:string){
    localStorage.setItem('accessToken', token)
  }

  // Obtener localmente el token de localStorage
  obtener_token(){
    return localStorage.getItem('accessToken')
  }

  obtener_header(){
    const token = this.obtener_token();
    return new HttpHeaders({
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`,
    })
  }

}
