import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private autentitacionS: AutenticacionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = !!this.autentitacionS.obtener_token();

    if (!isAuthenticated) {
      // Redirigir a la página de login si no hay token
      this.router.navigate(['/inicio-sesion']);
    }

    return isAuthenticated;
  }
}