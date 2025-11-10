import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from './App';

// mock react-router useLocation
jest.mock('react-router', () => ({
  useLocation: jest.fn(),
}));

// mock Header and MapComponent to avoid deep render
jest.mock('./Components/Header/Header', () => ({
  Header: () => <div data-testid="Header">Header</div>,
}));

jest.mock('./Components/Map/Map', () => ({
  MapComponent: ({ items, loading }: any) => (
    <div data-testid="MapComponent">
      {loading ? 'Loading...' : `Rendered ${items.length} items`}
    </div>
  ),
}));

// mock helper methods
const mockSetRepoName = jest.fn();
const mockSetRepoData = jest.fn();
const mockSetCommit = jest.fn();

jest.mock('./Components/utils/helper', () => ({
  setRepoName: (...args: any[]) => mockSetRepoName(...args),
  setRepoData: (...args: any[]) => mockSetRepoData(...args),
  setCommit: (...args: any[]) => mockSetCommit(...args),
}));

describe('App Component', () => {
  const { useLocation } = require('react-router');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Header and MapComponent', () => {
    useLocation.mockReturnValue({ pathname: '/' });

    render(<App />);
    expect(screen.getByTestId('Header')).toBeInTheDocument();
    expect(screen.getByTestId('MapComponent')).toBeInTheDocument();
  });

  it('initially shows loading state', async () => {
    useLocation.mockReturnValue({ pathname: '/' });
    render(<App />);
    expect(screen.getByTestId('MapComponent')).toHaveTextContent('Loading...');
  });
});
