import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import { NotFoundPage } from '../../src/pages/NotFoundPage';

describe('Notfound page ', () => {
  test('renders the 404 page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });
});
