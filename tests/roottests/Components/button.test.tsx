// Button.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../../src/components/Button';

describe('Button Component', () => {
  it('renders with correct type and title', () => {
    render(<Button type="button" title="Test Button">Click Me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('title', 'Test Button');
  });

  it('applies default styles', () => {
    render(<Button type="submit" title="Submit Button">Submit</Button>);
    
    const button = screen.getByRole('button', { name: /submit/i });

    expect(button).toHaveClass('bg-black rounded-[8px] w-[60%] text-white border border-[#E0E0E0] py-2 px-4 box-border text-[828282] hover:opacity-90');
  });

  it('renders with custom children', () => {
    render(<Button type="reset" title="Reset Button">Reset</Button>);
    
    const button = screen.getByRole('button', { name: /reset/i });

    expect(button).toHaveTextContent('Reset');
  });
});
