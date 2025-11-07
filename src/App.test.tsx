import { setRepoName } from './App';
import { USER } from './Components/utils/constants';

describe('setRepoName', () => {
  global.fetch = jest.fn();
  const mockSetRepo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it('should call extractRepo and setRepo when pathname is not "/"', () => {
    const mockLocation = { pathname: '/user/test-repo' };

    setRepoName(mockLocation, mockSetRepo);

    expect(mockSetRepo).toHaveBeenCalledWith('test-repo');
  });

  it('should fetch user repos when pathname is "/"', async () => {
    const mockLocation = { pathname: '/' };
    const mockResponse = [
      { name: 'mock-repo-1' },
      { name: 'mock-repo-2' },
    ];

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    await setRepoName(mockLocation, mockSetRepo);

    // wait for microtasks (fetch → then chain)
    await Promise.resolve();

    expect(fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/${USER}/repos`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringContaining('token '),
        }),
      }),
    );
    // expect(mockSetRepo).toHaveBeenCalled();
  });

  it('should handle empty data array gracefully', async () => {
    const mockLocation = { pathname: '/' };

    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });

    await setRepoName(mockLocation, mockSetRepo);
    await Promise.resolve();

    expect(mockSetRepo).not.toHaveBeenCalledWith(undefined);
  });
});
