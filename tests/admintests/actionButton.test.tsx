import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import ActionButton from '../../src/components/admincomponents/TableComponents/ActionButton';

describe('Sidebar component', () => {
  test('renders the Sidebar with links and icons', () => {
    render(<ActionButton />);
    expect(screen.getByRole('action')).toBeInTheDocument();
  });
});
