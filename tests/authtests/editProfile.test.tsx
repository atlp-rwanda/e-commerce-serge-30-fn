import React from 'react';
import {EditProfile} from '../../src/components/authcomponents/editProfile';
import { renderWithProviders } from '../../src/utils/test-utils';
import { screen } from '@testing-library/react';


describe('EditProfile Component', () => {
  it('should render EditProfile component', () => {
    renderWithProviders(<EditProfile />);
    
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
  });
});