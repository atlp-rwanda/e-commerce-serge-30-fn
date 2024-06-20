import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleBtn from '../../src/components/authcomponents/GoogleBtn';
import React from 'react';

describe('GoogleBtn Component', () => {
  it('renders the Google button', () => {
    render(<GoogleBtn />);
    const buttonElement = screen.getByTitle('Click to continue with google');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Signup with Google');
  });

  it('redirects to Google Auth URL on click', () => {
    delete (window as any).location;
    window.location = { href: '' } as Location;

    render(<GoogleBtn />);
    const buttonElement = screen.getByTitle('Click to continue with google');
    fireEvent.click(buttonElement);

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri:
        'https://staging-e-commerce-serge-30-bn.onrender.com/api/v1/auth/google/callback',
      client_id:
        '901745888726-2amumjqe35ijhbgvbe5jpoptk1vtcc66.apps.googleusercontent.com',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    const qs = new URLSearchParams(options).toString();
    const googleAuthUrl = `${rootUrl}?${qs}`;

    expect(window.location.href).toBe(googleAuthUrl);
  });
});
