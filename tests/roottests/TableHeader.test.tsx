import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableHeader from '../../src/components/rootcomponents/TableHeader';
import { render } from '../../src/utils/test-utils';

vi.mock('../../src/data/admin/index', () => {
  return {
    cartTableHeaderItems: [
      { id: 'image', label: 'Image' },
      { id: 'name', label: 'Name' },
      { id: 'quantity', label: 'Quantity' },
      { id: 'price', label: 'Price' },
    ],
  };
});

describe('TableHeader Component', () => {
  it('should render table headers correctly', () => {
    render(
      <table>
        <TableHeader />
      </table>,
    );

    const cartTableHeaderItems = [
      { id: 'image', label: 'Image' },
      { id: 'name', label: 'Name' },
      { id: 'quantity', label: 'Quantity' },
      { id: 'price', label: 'Price' },
    ];

    cartTableHeaderItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
