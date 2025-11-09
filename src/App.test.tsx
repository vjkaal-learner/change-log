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

  it('calls setRepoName on mount with location and setRepo', async () => {
    useLocation.mockReturnValue({ pathname: '/some/repo' });

    render(<App />);
    await waitFor(() => {
      expect(mockSetRepoName).toHaveBeenCalled();
      // we know the first argument is the location
      expect(mockSetRepoName.mock.calls[0][0]).toEqual({ pathname: '/some/repo' });
      // the second is a setter function
      expect(typeof mockSetRepoName.mock.calls[0][1]).toBe('function');
    });
  });

  it('calls setRepoData when repo changes', async () => {
    useLocation.mockReturnValue({ pathname: '/' });
    // mock setRepoName to immediately call setRepo
    mockSetRepoName.mockImplementation((_loc, setRepo) => setRepo('mock-repo'));

    render(<App />);

    await waitFor(() => {
      expect(mockSetRepoData).toHaveBeenCalledWith('mock-repo', expect.any(Function));
    });
  });

  it('calls setCommit when commitData changes', async () => {
    useLocation.mockReturnValue({ pathname: '/' });

    // simulate the helper calls chain
    mockSetRepoName.mockImplementation((_loc, setRepo) => setRepo('mock-repo'));
    mockSetRepoData.mockImplementation((_repo, setCommitData) => {
      setCommitData([{ date: '2025-11-01', text: 'Commit 1' }]);
    });

    render(<App />);

    await waitFor(() => {
      expect(mockSetCommit).toHaveBeenCalledWith(
        [{ date: '2025-11-01', text: 'Commit 1' }],
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  it('initially shows loading state', async () => {
    useLocation.mockReturnValue({ pathname: '/' });
    render(<App />);
    expect(screen.getByTestId('MapComponent')).toHaveTextContent('Loading...');
  });
});
