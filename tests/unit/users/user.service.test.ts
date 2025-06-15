import { Test, type TestingModule } from '@nestjs/testing';

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/prisma';

describe('User services tests', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    test('Should create a new user successfully', async () => {
      const now = new Date();
      const mockUserPayload = { email: 'test@test.com', name: 'Test user' };
      const expectedNewUser = { id: 1, ...mockUserPayload, createdAt: now, updatedAt: now };
      mockPrismaService.user.create.mockResolvedValue(expectedNewUser);

      const newUser = await service.create(mockUserPayload);

      expect(newUser).toEqual(expectedNewUser);
    });

    test('Should throw an error when creation of new user fails', async () => {
      const mockUserPayload = { email: 'test@test.com', name: 'Test user' };
      mockPrismaService.user.create.mockRejectedValueOnce(new Error('Fail to create user'));

      await expect(service.create(mockUserPayload)).rejects.toThrow(Error);
    });
  });

  describe('findAllUsers', () => {
    test('Should return a list of users', async () => {
      const now = new Date();
      const mockUserPayload = { email: 'test@test.com', name: 'Test user' };
      const expectedNewUser = { id: 1, ...mockUserPayload, createdAt: now, updatedAt: now };
      mockPrismaService.user.findMany.mockResolvedValue([expectedNewUser]);

      const users = await service.findAllUsers();

      expect(users).toEqual([expectedNewUser]);
      expect(users).toHaveLength(1);
    });
  });

  describe('findUserBasedOnId', () => {
    test('Should return a single user based on id', async () => {
      const mockId = 6;
      const now = new Date();
      const mockUserPayload = { email: 'test@test.com', name: 'Test user' };
      const expectedNewUser = { id: mockId, ...mockUserPayload, createdAt: now, updatedAt: now };
      mockPrismaService.user.findUniqueOrThrow.mockResolvedValue(expectedNewUser);

      const user = await service.findUserBasedOnId(mockId);

      expect(user).toEqual(expectedNewUser);
    });
  });

  describe('updateUserBasedOnId', () => {
    test('Should update a user', async () => {
      const mockId = 6;
      const now = new Date();
      const mockUser = { id: mockId, email: 'test@test.com', name: 'Test user', createdAt: now, updatedAt: now };
      const mockUserPayload = { email: 'gsn@test.com' };
      const expectedUser = { ...mockUser, ...mockUserPayload };
      mockPrismaService.user.update.mockResolvedValue(expectedUser);

      const updatedUser = await service.updateUserBasedOnId(mockId, mockUserPayload);

      expect(updatedUser).toEqual(expectedUser);
    });
  });

  describe('deleteUserById', () => {
    test('Should remove | delete user', async () => {
      const mockId = 1;
      const now = new Date();
      const mockUser = { id: mockId, email: 'test@test.com', name: 'Test user', createdAt: now, updatedAt: now };
      mockPrismaService.user.delete.mockResolvedValue(mockUser);

      const deletedUserId = await service.deleteUserById(mockId);

      expect(deletedUserId).toBe(mockId);
    });
  });
});
