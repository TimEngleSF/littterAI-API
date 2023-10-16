import { postPhotoInfo } from '../../../../src/Controllers/PhotoInfo/postPhotoInfo';
import Models from '../../../../src/Models';
import { logError } from '../../../../src/Errors/logError';

jest.mock('../../../../src/Models', () => {
  return {
    photoInfoModels: {
      addPhoto: jest.fn(),
    },
  };
});
jest.mock('../../../../src/Errors/logError');

describe('postPhotoInfo', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    // Mock Express request and response objects
    mockRequest = {
      body: {
        category: 'paper',
      },
      user: {
        userId: 'someUserId',
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it('should return 400 if the category is invalid', async () => {
    mockRequest.body.category = 'invalidCategory';

    await postPhotoInfo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it('should handle valid category and return appropriate status and data', async () => {
    const mockAddPhoto = {
      code: 201,
      data: { message: 'Successfully added photo' },
    };

    (Models.photoInfoModels.addPhoto as jest.Mock).mockResolvedValue(
      mockAddPhoto
    );

    await postPhotoInfo(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith(mockAddPhoto.data);
  });

  it('should handle errors and log them', async () => {
    const mockError = new Error('Test Error');
    (Models.photoInfoModels.addPhoto as jest.Mock).mockRejectedValue(mockError);

    await postPhotoInfo(mockRequest, mockResponse);

    expect(logError).toHaveBeenCalledWith(
      mockError,
      'Error occured while executing addPhoto in Models/PhotoInfo/addPhoto'
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith({
      message: 'An error occurred while processing your request.',
    });
  });
});
