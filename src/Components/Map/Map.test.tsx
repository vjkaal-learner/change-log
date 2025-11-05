import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MapComponent } from './Map';

// ✅ Mock child components (since we're not testing them directly)
jest.mock('./DateComponent', () => ({
    DateComponent: ({ id, date }: { id: number; date: string }) => (
        <div data-testid={`DateComponent-${id}`}>{date}</div>
    ),
}));

jest.mock('./TextComponent', () => ({
    TextComponent: ({ id, text }: { id: number; text: string }) => (
        <div data-testid={`TextComponent-${id}`}>{text}</div>
    ),
}));

describe('MapComponent', () => {
    const mockItems = [
        { date: '2025-11-04', text: 'First log entry' },
        { date: '2025-11-05', text: 'Second log entry' },
    ];

    test('renders the Map container', () => {
        render(<MapComponent items={mockItems} />);
        const mapContainer = screen.getByTestId('Map');
        expect(mapContainer).toBeInTheDocument();
    });

    test('renders correct number of MapItem entries', () => {
        render(<MapComponent items={mockItems} />);
        const mapItems = screen.getAllByTestId('MapItem');
        expect(mapItems).toHaveLength(mockItems.length);
    });

    test('renders DateComponent and TextComponent for each entry', () => {
        render(<MapComponent items={mockItems} />);

        mockItems.forEach((item, index) => {
            const dateEl = screen.getByTestId(`DateComponent-${index}`);
            const textEl = screen.getByTestId(`TextComponent-${index}`);

            expect(dateEl).toHaveTextContent(item.date);
            expect(textEl).toHaveTextContent(item.text);
        });
    });

    test('renders nothing when items array is empty', () => {
        render(<MapComponent items={[]} />);
        const mapContainer = screen.getByTestId('Map');
        expect(screen.queryAllByTestId('MapItem')).toHaveLength(0);
        expect(mapContainer).toBeEmptyDOMElement();
    });
});
