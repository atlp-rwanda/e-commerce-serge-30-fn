import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableHeader from '../../src/components/admincomponents/TableComponents/TableHeader';
import { TableHeaderItem } from '../../src/data/admin/index';
import { render } from '../../src/utils/test-utils';
// Mock data

// Define the mock data within the mock implementation
vi.mock('../../src/data/admin/index', () => {
  return {
    tableHeaderItems: [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'status', label: 'Status' },
      { id: 'createdAt', label: 'Created At' },
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

    // Check if all header labels are rendered
    const tableHeaderItems = [
      { id: 'name', label: 'Name' },
      { id: 'email', label: 'Email' },
      { id: 'status', label: 'Status' },
      { id: 'createdAt', label: 'Created At' },
    ];

    tableHeaderItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
