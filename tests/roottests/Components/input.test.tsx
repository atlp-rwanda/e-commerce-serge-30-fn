// Input.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../../../src/components/Input';

describe('Input Component', () => {
  it('renders with default type and placeholder', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with specified type, name, and value', () => {
    render(<Input type="email" name="email" value="test@example.com" />);

    const input = screen.getByDisplayValue('test@example.com');
    
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('applies custom class names and border color', () => {
    render(<Input className="custom-class" borderColor="border-red-500" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('custom-class border-red-500');
  });

  it('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    const input = screen.getByRole('textbox');

    expect(ref.current).toBe(input);
  });
});
