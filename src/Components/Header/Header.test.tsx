import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';
import {APP_SUBHEADER, APP_TITLE} from '../utils/constants';

test('renders the header from constants', () => {
    render(<Header />);
    const headerElement = screen.getByText(APP_TITLE);
    const subHeaderElement = screen.getByText(APP_SUBHEADER);
    expect(headerElement).toBeInTheDocument();
    expect(subHeaderElement).toBeInTheDocument();
});