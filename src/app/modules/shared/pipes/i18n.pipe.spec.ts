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

import { screen } from '@testing-library/angular';
import { renderComponent } from '@tests/test-render.utils';
import { SharedModule } from '..';

describe('I18nPipe', () => {
  it('should format string without errors', async () => {
    await renderComponent(`{{ 'unitTest.test01' | i18n }}`, {
      imports: [SharedModule],
    });

    expect(screen.getByText('This is for unit tests purposes.')).toBeInTheDocument();
  });

  it('should not format string if string is not found', async () => {
    const testString = 'notFound.test.notFound';
    await renderComponent(`{{ '${testString}' | i18n }}`, {
      imports: [SharedModule],
    });

    expect(screen.getByText(testString)).toBeInTheDocument();
  });

  it('should format string with correct data passed in string', async () => {
    const errorMessageObject = { id: 'unitTest.test02', values: { test: 5 } };
    await renderComponent(`{{ errorMessageObject | i18n }}`, {
      imports: [SharedModule],
      componentProperties: { errorMessageObject },
    });

    expect(screen.getByText('This is for unit tests purposes. 5')).toBeInTheDocument();
  });

  it('should format string with correct data passed as property', async () => {
    await renderComponent(`{{ 'unitTest.test02' | i18n:{test: 10} }}`, {
      imports: [SharedModule],
    });

    expect(screen.getByText('This is for unit tests purposes. 10')).toBeInTheDocument();
  });
});
