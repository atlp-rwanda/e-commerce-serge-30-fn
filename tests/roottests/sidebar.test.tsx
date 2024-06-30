import React from 'react';
import { Sidebar } from '../../src/components/rootcomponents/Sidebar';
import { render,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Sidebar Component', () => {
    test('renders sidebar component correctly', () => {
        render(
            <div id="root">
                <Provider store={store}>
                <Router>
                    <Sidebar />
                </Router>
                </Provider>
            </div>,
            );
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
        expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
    });
})
