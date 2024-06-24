// Sidebar.test.tsx
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../src/utils/test-utils'; // Adjust path based on your file structure
import Sidebar from '../../src/components/vendorcomponents/Sidebar'; // Adjust path based on your file structure

describe('Sidebar component', () => {
  test('renders the Sidebar with links and icons', () => {
    render(<Sidebar />);

    // Check for the brand name
    expect(screen.getByTestId('brand-name')).toHaveTextContent('Exclusive');

    // Check for icons
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-icon')).toBeInTheDocument();
    expect(screen.getByTestId('products-icon')).toBeInTheDocument();
    expect(screen.getByTestId('notifications-icon')).toBeInTheDocument();
    expect(screen.getByTestId('categories-icon')).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByTestId('navlink-dashboard')).toHaveTextContent(
      'Dashboard',
    );
    expect(screen.getByTestId('navlink-products')).toHaveTextContent(
      'Products',
    );
    expect(screen.getByTestId('navlink-notifications')).toHaveTextContent(
      'Notifications',
    );
    expect(screen.getByTestId('navlink-categories')).toHaveTextContent(
      'Categories',
    );
  });

  test('clicking the logout button logs out the user', async () => {
    render(<Sidebar />);

    fireEvent.click(screen.getByTestId('logout-button'));

    await waitFor(() => {
      expect(screen.getByTestId('logout-button')).toHaveTextContent(
        'Logging out...',
      );
    });

    // Assuming the local storage and redirection logic works
    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('user')).toBeNull();
      expect(window.location.pathname).toBe('/');
    });
  });
});
