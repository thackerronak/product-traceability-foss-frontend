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

import { SharedModule } from '@shared/shared.module';
import { fireEvent, screen } from '@testing-library/angular';
import { renderComponent } from '@tests/test-render.utils';
import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelector', () => {
  const renderLanguageSelector = () =>
    renderComponent(
      `
    <app-language-selector></app-language-selector>
    <div>{{'actions.back' | i18n}}</div>
  `,
      {
        imports: [SharedModule],
        declarations: [LanguageSelectorComponent],
      },
    );

  it('should allow to change the language', async () => {
    await renderLanguageSelector();
    expect(screen.getByText('Back')).toBeInTheDocument();
    fireEvent.click(screen.getByText('en'));
    fireEvent.click(screen.getByText('Polski'));
    // as in test there is no PL translations expectation that translation module
    // would return translation key aas fallback for PL
    expect(await screen.findByText('actions.back')).toBeInTheDocument();
  });
});
