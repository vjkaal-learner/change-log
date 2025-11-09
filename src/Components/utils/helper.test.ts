import { filterCommitData, extractRepo } from './helper';
import { MapProps } from '../Map/Map';

describe('helper utilities', () => {
  // ---------------- filterCommitData ----------------
  describe('filterCommitData', () => {
    it('should return an empty array if commitData is falsy', () => {
      expect(filterCommitData(null as any)).toEqual([]);
      expect(filterCommitData(undefined as any)).toEqual([]);
    });

    it('should transform commitData into MapProps[]', () => {
      const mockCommitData = [
        {
          commit: {
            committer: { date: '2025-11-04T12:00:00Z' },
            message: 'Initial commit',
          },
        },
        {
          commit: {
            committer: { date: '2025-11-05T15:30:00Z' },
            message: 'Added README',
          },
        },
      ];

      const result = filterCommitData(mockCommitData);

      // check structure
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);

      // check correct keys
      result.forEach((item: MapProps) => {
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('text');
      });

      // check values
      expect(result[0].text).toBe('Initial commit');
      expect(result[1].text).toBe('Added README');
      // toLocaleDateString() depends on environment, but we can at least check it's a string
      expect(typeof result[0].date).toBe('string');
    });

    it('should handle empty commitData array gracefully', () => {
      const result = filterCommitData([]);
      expect(result).toEqual([]);
    });

    it('should not crash if a commit item has missing fields', () => {
      const mockCommitData = [
        { commit: {} },
        {},
        null,
      ];
      expect(() => filterCommitData(mockCommitData as any)).not.toThrow();
    });
  });

  // ---------------- extractRepo ----------------
  describe('extractRepo', () => {
    it('should extract the third segment from a valid pathname', () => {
      const pathname = '/user/repo-name';
      const result = extractRepo(pathname);
      expect(result).toBe('repo-name');
    });

    it('should return undefined if pathname has fewer than 3 segments', () => {
      expect(extractRepo('/onlyone')).toBeUndefined();
    });

    it('should handle extra slashes correctly', () => {
      const pathname = '/vanshaj//awesome-repo/';
      const result = extractRepo(pathname);
      expect(result).toBe('awesome-repo');
    });
  });
});
