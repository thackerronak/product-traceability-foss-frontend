/********************************************************************************
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { realm } from '../api/api.service.properties';
import { Role } from './role.model';
import { RoleService } from './role.service';

type GuardValue = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private readonly roleService: RoleService, private readonly router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): GuardValue {
    return this.validateUserRole(next);
  }

  public canActivateChild(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): GuardValue {
    return this.canActivate(next, _state);
  }

  public canDeactivate(): GuardValue {
    return true;
  }

  public canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  public validateUserRole(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data.roles as Role[] | Role;

    if (!requiredRoles || this.roleService.hasAccess(requiredRoles)) {
      return true;
    }

    void this.router.navigate([realm]);
    return false;
  }
}
