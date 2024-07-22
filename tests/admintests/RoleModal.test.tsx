import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import RoleModal from '../../src/components/admincomponents/TableComponents/RoleModal';

describe('RoleModal component', () => {
  test('renders the Modal', () => {
    render(
      <RoleModal
        isOpen={console.log}
        onClose={console.log}
        onAssignRole={console.log}
        current="true"
      />,
    );
    expect(screen.getByText(/role/i)).toBeInTheDocument();
  });
});
