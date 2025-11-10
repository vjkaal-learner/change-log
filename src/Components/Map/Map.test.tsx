import { render, screen } from '@testing-library/react';
import { MapComponent, MapProps } from './Map';

// mock child components to avoid deep rendering
jest.mock('./DateComponent', () => ({
    DateComponent: ({ id, date, loading }: any) => (
      <div data-testid={`DateComponent-${id}`}>
          {loading ? 'Loading...' : date}
      </div>
    ),
}));

jest.mock('./TextComponent', () => ({
    __esModule: true,
    default: ({ id, text, loading }: any) => (
      <div data-testid={`TextComponent-${id}`}>
          {loading ? 'Loading...' : text}
      </div>
    ),
}));

describe('MapComponent', () => {
    const mockItems: MapProps[] = [
        { date: '2025-11-01', text: 'Commit 1' },
        { date: '2025-11-02', text: 'Commit 2' },
    ];

    it('renders without crashing', () => {
        render(<MapComponent items={[]} loading={false} />);
        expect(screen.getByTestId('Map')).toBeInTheDocument();
    });

    it('renders correct number of MapItem elements', () => {
        render(<MapComponent items={mockItems} loading={false} />);
        const items = screen.getAllByTestId('MapItem');
        expect(items).toHaveLength(mockItems.length);
    });

    it('renders DateComponent and TextComponent for each item', () => {
        render(<MapComponent items={mockItems} loading={false} />);
        mockItems.forEach((_, idx) => {
            expect(screen.getByTestId(`DateComponent-${idx}`)).toBeInTheDocument();
            expect(screen.getByTestId(`TextComponent-${idx}`)).toBeInTheDocument();
        });
    });

    it('passes correct text and date values to child components', () => {
        render(<MapComponent items={mockItems} loading={false} />);
        expect(screen.getByText('2025-11-01')).toBeInTheDocument();
        expect(screen.getByText('Commit 1')).toBeInTheDocument();
        expect(screen.getByText('2025-11-02')).toBeInTheDocument();
        expect(screen.getByText('Commit 2')).toBeInTheDocument();
    });

    it('displays "Loading..." text in child components when loading=true', () => {
        render(<MapComponent items={mockItems} loading={true} />);
        const loadingTexts = screen.getAllByText('Loading...');
        // each MapItem has both a DateComponent and TextComponent, so total = items.length * 2
        expect(loadingTexts).toHaveLength(mockItems.length * 2);
    });
});
