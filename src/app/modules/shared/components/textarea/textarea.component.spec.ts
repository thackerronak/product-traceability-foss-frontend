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

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaComponent } from '@shared/components/textarea/textarea.component';
import { SharedModule } from '@shared/shared.module';
import { fireEvent, screen } from '@testing-library/angular';
import { renderComponent } from '@tests/test-render.utils';

describe('TextareaComponent', () => {
  const renderTextarea = async (label = 'Label') => {
    const form = new FormGroup({
      formField: new FormControl(undefined, [Validators.required]),
    });

    await renderComponent(
      `
      <form [formGroup]="form">
        <app-textarea formControlName="formField" [label]="'${label}'"></app-textarea>
      </form>`,
      {
        declarations: [TextareaComponent],
        imports: [ReactiveFormsModule, SharedModule],
        componentProperties: {
          form: new FormGroup({
            formField: new FormControl(undefined, [Validators.required]),
          }),
        },
      },
    );

    return { form };
  };

  it('should render textarea', async () => {
    const label = 'Some label';
    await renderTextarea(label);

    const textareaLabelElement = screen.getByText(label);
    expect(textareaLabelElement).toBeInTheDocument();
  });

  it('should not render error message if textarea is not touched', async () => {
    const { form } = await renderTextarea();

    const textareaLabelElement = screen.queryByText('This field is required!');
    expect(form.controls.formField.errors).toEqual({ required: true });
    expect(textareaLabelElement).not.toBeInTheDocument();
  });

  it('should render error message if textarea is touched', async () => {
    const label = 'Some label';
    const { form } = await renderTextarea(label);

    fireEvent.blur(screen.getByLabelText(label));
    const textareaLabelElement = screen.getByText('This field is required!');
    expect(form.controls.formField.errors).toEqual({ required: true });
    expect(textareaLabelElement).toBeInTheDocument();
  });
});
