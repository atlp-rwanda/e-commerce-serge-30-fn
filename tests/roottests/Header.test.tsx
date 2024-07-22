import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import { Header } from '../../src/components/rootcomponents/Header';

describe('RoleModal component', () => {
  test('renders the Modal', () => {
    render(<Header />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
