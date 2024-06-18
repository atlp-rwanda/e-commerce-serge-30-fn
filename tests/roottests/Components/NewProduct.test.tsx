import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import React from 'react';
import NewProduct from '../../../src/pages/rootpages/NewProduct';
describe('App', () => {
  it('should new product component', () => {
    render(<NewProduct />);
    const heading = screen.getByText(/air/i);
    expect(heading).toBeInTheDocument();
  });
});
