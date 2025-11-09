import { setRepoName, setRepoData, setCommit } from './DataRendererHelper';
import { extractRepo, filterCommitData } from './helper';
import { STATIC_COMMIT_STRING, STATICURL, USER } from './constants';
import { MapProps } from '../Map/Map';

jest.mock('./helper', () => ({
  extractRepo: jest.fn(),
  filterCommitData: jest.fn(),
}));

global.fetch = jest.fn();

describe('helperFunctions', () => {
  const mockSetRepo = jest.fn();
  const mockSetCommitData = jest.fn();
  const mockSetItemsList = jest.fn();
  const mockSetLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ---------------- setRepoName ----------------
  describe('setRepoName', () => {
    it('should call extractRepo and setRepo when pathname is not "/"', () => {
      (extractRepo as jest.Mock).mockReturnValue('mock-repo');
      const location = { pathname: '/user/mock-repo' };

      setRepoName(location, mockSetRepo);

      expect(extractRepo).toHaveBeenCalledWith('/user/mock-repo');
      expect(mockSetRepo).toHaveBeenCalledWith('mock-repo');
      expect(fetch).not.toHaveBeenCalled();
    });

    it('should fetch user repos and set repo name when pathname is "/"', async () => {
      const location = { pathname: '/' };
      const mockData = [{ name: 'test-repo' }];

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });

      await setRepoName(location, mockSetRepo);
      await Promise.resolve(); // let promises resolve

      expect(fetch).toHaveBeenCalledWith(
        `https://api.github.com/users/${USER}/repos`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('token '),
          }),
        })
      );
      expect(mockSetRepo).toHaveBeenCalledWith('test-repo');
    });

    it('should not crash if fetch returns invalid data', async () => {
      const location = { pathname: '/' };

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      });

      await setRepoName(location, mockSetRepo);
      await Promise.resolve();

      expect(mockSetRepo).not.toHaveBeenCalled();
    });
  });

  // ---------------- setRepoData ----------------
  describe('setRepoData', () => {
    it('should fetch commits and setCommitData with filtered data', async () => {
      const repo = 'my-repo';
      const mockCommitApiData = [{ sha: '123' }];
      const filtered = [{ date: '2025-11-04', text: 'Commit' }];

      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockCommitApiData),
      });
      (filterCommitData as jest.Mock).mockReturnValue(filtered);

      await setRepoData(repo, mockSetCommitData);
      await Promise.resolve();

      expect(fetch).toHaveBeenCalledWith(
        `${STATICURL}/${USER}/${repo}/${STATIC_COMMIT_STRING}`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('token '),
          }),
        })
      );
      expect(filterCommitData).toHaveBeenCalledWith(mockCommitApiData);
      expect(mockSetCommitData).toHaveBeenCalledWith(filtered);
    });

    it('should not fetch if repo is empty', async () => {
      await setRepoData('', mockSetCommitData);
      expect(fetch).not.toHaveBeenCalled();
      expect(mockSetCommitData).not.toHaveBeenCalled();
    });
  });

  // ---------------- setCommit ----------------
  describe('setCommit', () => {
    it('should call setItemsList and setLoading(false) if commitData exists', () => {
      const commits: MapProps[] = [
        { date: '2025-11-01', text: 'Initial Commit' },
      ];

      setCommit(commits, mockSetItemsList, mockSetLoading);

      expect(mockSetItemsList).toHaveBeenCalledWith(commits);
      expect(mockSetLoading).toHaveBeenCalledWith(false);
    });

    it('should do nothing if commitData is empty', () => {
      const commits: MapProps[] = [];
      setCommit(commits, mockSetItemsList, mockSetLoading);

      expect(mockSetItemsList).not.toHaveBeenCalled();
      expect(mockSetLoading).not.toHaveBeenCalled();
    });
  });
});
