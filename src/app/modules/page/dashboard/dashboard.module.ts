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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { getI18nPageProvider } from '@core/i18n';
import { MapComponent } from '@page/dashboard/presentation/map/map.component';
import { SharedModule } from '@shared/shared.module';
import { TemplateModule } from '@shared/template.module';
import { DashboardFacade } from './abstraction/dashboard.facade';
import { DashboardService } from './core/dashboard.service';
import { DashboardState } from './core/dashboard.state';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './presentation/dashboard.component';

@NgModule({
  declarations: [DashboardComponent, MapComponent],
  imports: [CommonModule, TemplateModule, SharedModule, DashboardRoutingModule],
  providers: [DashboardService, DashboardFacade, DashboardState, ...getI18nPageProvider('page.dashboard')],
})
export class DashboardModule {}
