// Navbar.test.tsx
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
// Adjust path based on your file structure
import Navbar from '../../src/components/vendorcomponents/Navbar'; // Adjust path based on your file structure

describe('Navbar component', () => {
  test('renders without crashing', () => {
    render(<Navbar />);
    expect(screen.getByText(/Hello, Sage/i)).toBeInTheDocument();
  });

  test('displays the correct date', () => {
    render(<Navbar />);
    expect(screen.getByText(/Wen, 20th 2024/i)).toBeInTheDocument();
  });

  test('renders user avatar', () => {
    render(<Navbar />);
    const avatar = screen.getByAltText('Avatar');
    expect(avatar).toHaveAttribute('src', 'https://i.pravatar.cc/300');
  });

  test('button for user menu has the correct attributes', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /toggle user menu/i });
    expect(button).toHaveAttribute('aria-haspopup', 'menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('user menu button can be clicked', () => {
    render(<Navbar />);
    const button = screen.getByRole('button', { name: /toggle user menu/i });
    fireEvent.click(button);
    // Since there's no state change or menu opening, we're just testing if it clicks without error.
    expect(button).toBeInTheDocument();
  });
});
