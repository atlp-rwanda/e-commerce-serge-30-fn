import React from 'react';
import { UserSettings } from '../../src/pages/userpage/userSettings';
import { render,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('UserSettings Page', () => {
    test('renders UserSettings page correctly', () => {
        render(
            <div id="root">
                <Provider store={store}>
                <Router>
                    <UserSettings />
                </Router>
                </Provider>
            </div>,
            );
        expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
    });
})
