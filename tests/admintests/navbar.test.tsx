import { screen } from '@testing-library/react';
import { render } from '../../src/utils/test-utils';
import '@testing-library/jest-dom/vitest';
import Navbar from '../../src/components/admincomponents/Navbar';

describe('Admin Navbar', () => {
  it('should render navbar component', () => {
    render(<Navbar />);
    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
  });
  it('should store user state in a state', () => {
    const mockUser: IUser = {
      user_id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      active: true,
      createdAt: '2021-01-01T00:00:00.000Z',
      role: 'admin',
      image_url: 'https://example.com/image.jpg',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));

    render(<Navbar />);

    expect(screen.getByText(/John/i)).toBeInTheDocument();
  });
});
