/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Tooltip } from '../';
import userEvent from '@testing-library/user-event';

describe('Tooltip', () => {
  it('should support a custom className with the `className` prop', () => {
    const { container } = render(
      <Tooltip className="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should apply additional props to the outermost element', () => {
    const { container } = render(
      <Tooltip data-testid="test" label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support initially showing the tooltip with `defaultOpen`', () => {
    const { container } = render(
      <Tooltip defaultOpen label="Close">
        <button type="button">X</button>
      </Tooltip>
    );

    const popoverContainer = container.querySelector('.cds--popover-container');
    expect(popoverContainer).toHaveClass('cds--popover--open');
  });

  it('should support labeling an element by its tooltip', () => {
    render(
      <Tooltip label="Close">
        <button type="button">X</button>
      </Tooltip>
    );
    expect(screen.getByText('X')).toHaveAttribute('aria-labelledby');
  });

  it('should support describing an element by its tooltip', () => {
    render(
      <Tooltip description="test description">
        <button type="button">test</button>
      </Tooltip>
    );
    expect(screen.getByText('test')).toHaveAttribute('aria-describedby');
  });

  it('should call onFocus', () => {
    const onFocus = jest.fn();
    render(
      <Tooltip description="test description">
        <button type="button" onFocus={onFocus}>
          test
        </button>
      </Tooltip>
    );

    userEvent.click(screen.getByRole('button'));
    expect(onFocus).toHaveBeenCalled();
  });

  it('should call onBlur', () => {
    const onBlur = jest.fn();
    render(
      <Tooltip description="test description">
        <button type="button" onBlur={onBlur}>
          test
        </button>
      </Tooltip>
    );

    userEvent.click(screen.getByRole('button'));
    userEvent.tab();

    expect(onBlur).toHaveBeenCalled();
  });

  it('should close when item is activated and `closeOnActivation`', () => {
    const { container } = render(
      <>
        <Tooltip closeOnActivation label="Close">
          <button type="button">X</button>
        </Tooltip>
        <div>Hey</div>
      </>
    );

    const popoverContainer = container.querySelector('.cds--popover-container');
    const button = screen.getByRole('button');

    button.focus();
    expect(popoverContainer).toHaveClass('cds--popover--open');
    button.click();
    expect(popoverContainer).not.toHaveClass('cds--popover--open');
  });
});
