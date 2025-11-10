import { filterCommitData, extractRepo, getMessageValue, getDateValue } from './helper';
import { MapProps } from '../Map/Map';

import * as alert from "./alert";
import {showAlert} from "./alert";

describe('helper utilities', () => {
  // ---------------- filterCommitData ----------------
  describe('filterCommitData', () => {

    const showAlert = jest.spyOn(alert, 'showAlert');

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
      filterCommitData(mockCommitData);
      expect(showAlert).toHaveBeenCalled();
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

  describe('getMessageValue', () => {

    const showAlert = jest.spyOn(alert, 'showAlert');

    it('should return the commit message when present', () => {
      const item = {
        commit: {
          message: "Initial commit"
        }
      };

      const result = getMessageValue(item);
      expect(result).toBe("Initial commit");
    });

    it('should throw an error when commit or message is missing', () => {
      const item = { commit: { message: ''} };
      const result = getMessageValue(item);

      expect(result).toBe('');
      expect(showAlert).toHaveBeenCalledWith("Could not find commit or its message", "error");
    });

    it('should throw an error when item is undefined', () => {
      const result = getMessageValue(undefined as any);

      expect(result).toBe('');
      expect(showAlert).toHaveBeenCalledWith("Could not find commit or its message", "error");
    });
  });

  describe('getDateValue', () => {

    const showAlert = jest.spyOn(alert, 'showAlert');

    it('should return the formatted commit date when present', () => {
      const dateString = '2024-05-17T12:34:56Z';
      const item = {
        commit: {
          committer: { date: dateString }
        }
      };

      const result = getDateValue(item);

      // we can't hardcode date since toLocaleDateString() depends on system locale
      // but we can check that it's a string and includes the year
      expect(result).toContain('2024');
    });

    it('should throw an error when committer or date is missing', () => {
      const item = { commit: { committer: { date: ''} } };
      const result = getDateValue(item);

      expect(result).toBe('');
      expect(showAlert).toHaveBeenCalledWith("Could not find commit or its date", "error");
    });

    it('should throw an error when item is undefined', () => {
      const result = getDateValue(undefined as any);

      expect(result).toBe('');
      expect(showAlert).toHaveBeenCalledWith("Could not find commit or its date", "error");
    });
  });
});
