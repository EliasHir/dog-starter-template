import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';
import { Request, Response } from 'express';

describe('getDogImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('returns correct data and success status', async () => {
    const mockedApiResponse = {
      imageUrl: 'https://dog.ceo/api/breeds/image/random',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockedApiResponse);

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as unknown as Response;

    const req = {} as Request;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedApiResponse
    });
  });
});