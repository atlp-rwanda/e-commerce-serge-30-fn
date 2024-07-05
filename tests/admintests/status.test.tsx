import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import Status from '../../src/components/admincomponents/TableComponents/Status';

describe('Sidebar component', () => {
  test('renders the Sidebar with links and icons', () => {
    render(<Status />);
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });
});
