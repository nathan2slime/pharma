import { render, fireEvent, screen } from '@testing-library/react';

import { PharButton } from '../index';

describe('PharButton', () => {
  it('renders button with children', () => {
    render(<PharButton data-testid="button">Hello World</PharButton>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders button with className', () => {
    render(
      <PharButton className="test-class" data-testid="button">
        Hello World
      </PharButton>
    );
    expect(screen.getByTestId('button')).toHaveClass('test-class');
  });

  it('renders block button', () => {
    render(
      <PharButton block data-testid="button">
        Hello World
      </PharButton>
    );
    expect(screen.getByTestId('button')).toHaveClass('block');
  });

  it('fires click event', () => {
    const onClick = jest.fn();

    render(
      <PharButton data-testid="button" onClick={onClick}>
        Click Me
      </PharButton>
    );

    fireEvent.click(screen.getByTestId('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
