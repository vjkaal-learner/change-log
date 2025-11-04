import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderComponent } from './HeaderComponent';
import { APP_TITLE } from '../utils/constants';

test('renders the header from constants', () => {
    render(<HeaderComponent />);
    const headerElement = screen.getByText(APP_TITLE);
    expect(headerElement).toBeInTheDocument();
});
