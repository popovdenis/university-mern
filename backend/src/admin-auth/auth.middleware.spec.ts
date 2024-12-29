import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { JwtService } from '@nestjs/jwt';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockJwtService = {
      verify: jest.fn().mockReturnValue({ email: 'test@example.com', sub: '123' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authMiddleware = module.get<AuthMiddleware>(AuthMiddleware);
  });

  it('should be defined', () => {
    expect(authMiddleware).toBeDefined();
  });

  it('should verify the token and set req.user', () => {
    const mockReq: any = {
      headers: { authorization: 'Bearer valid-token' },
    };
    const mockRes: any = {};
    const mockNext = jest.fn();

    authMiddleware.use(mockReq, mockRes, mockNext);

    expect(mockJwtService.verify).toHaveBeenCalledWith('valid-token');
    expect(mockReq.user).toEqual({ email: 'test@example.com', sub: '123' });
    expect(mockNext).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if no token is provided', () => {
    const mockReq: any = { headers: {} };
    const mockRes: any = {};
    const mockNext = jest.fn();

    expect(() => authMiddleware.use(mockReq, mockRes, mockNext)).toThrow('Authorization header missing');
  });

  it('should throw UnauthorizedException if token is invalid', () => {
    mockJwtService.verify = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    const mockReq: any = {
      headers: { authorization: 'Bearer invalid-token' },
    };
    const mockRes: any = {};
    const mockNext = jest.fn();

    expect(() => authMiddleware.use(mockReq, mockRes, mockNext)).toThrow('Invalid token');
  });
});