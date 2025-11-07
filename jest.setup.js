import '@testing-library/jest-dom';

// optional mock for react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(() => ({ pathname: '/' })),
    useNavigate: jest.fn(),
    Link: ({ children }) => <>{children}</>,
}));
