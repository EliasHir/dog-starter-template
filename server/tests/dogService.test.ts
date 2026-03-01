import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('getRandomDogImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns correct imageUrl and success status and is fetched once', async () => {
    const mockedApiResponse = {
      message: 'https://dog.ceo/api/breeds/image/random',
      status: 'success'
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockedApiResponse
    } as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedApiResponse.message);
    expect(result.status).toBe('success');
    expect(fetch).toHaveBeenCalledOnce();
  });

  test('rejects fetch and throws an error', async () => {
  vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: false,
    status: 500
  } as Response);

  await expect(getRandomDogImage()).rejects.toThrow(
    'Failed to fetch dog image: Dog API returned status 500'
  );
});
});