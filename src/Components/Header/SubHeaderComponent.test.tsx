import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubHeaderComponent } from './SubHeaderComponent';
import { APP_SUBHEADER } from '../utils/constants';

test('renders the subheader from constants', () => {
    render(<SubHeaderComponent />);
    const subHeaderElement = screen.getByText(APP_SUBHEADER);
    expect(subHeaderElement).toBeInTheDocument();
});
