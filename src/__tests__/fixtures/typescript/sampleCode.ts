/* TEST FIXTURE FILE - NOT AN EXAMPLE
 * This file is used by automated tests to validate linting rules.
 * For TypeScript code examples, see style guide documentation.
 */

import { Request, Response } from 'express';
import { User, UserRole } from './types';

// Interfaces and types follow naming conventions
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Enums use PascalCase
enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

// Classes follow naming conventions
class UserService {
  private static readonly DEFAULT_PAGE_SIZE = 20;
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // Async functions with proper error handling
  async getUsers(page = 1, pageSize = UserService.DEFAULT_PAGE_SIZE): Promise<User[]> {
    try {
      const offset = (page - 1) * pageSize;
      return await this.repository.findAll({ offset, limit: pageSize });
    } catch (error) {
      throw new Error(
        `Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  // Functions with explicit return types
  validateUser(user: Partial<User>): user is User {
    return !!(user.id && user.email && user.role);
  }
}

// Express route handler with proper typing
export const getUserHandler = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<User>>
): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({
        data: null as never,
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      data: user,
      status: HttpStatus.OK,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      data: null as never,
      status: HttpStatus.BAD_REQUEST,
      message: error instanceof Error ? error.message : 'An error occurred',
    });
  }
};

// Array methods with proper formatting
const processUsers = (users: User[]): string[] => {
  return users
    .filter((user) => user.role === UserRole.ADMIN)
    .map((user) => user.email)
    .sort((a, b) => a.localeCompare(b));
};

// Object with trailing commas
const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  timeout: 5000,
  retries: 3,
  features: {
    authentication: true,
    logging: true,
    caching: false,
  },
};

// Test examples (would normally be in a .test.ts file)
describe('UserService', () => {
  let service: UserService;
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepository = createMockRepository();
    service = new UserService(mockRepository);
  });

  test('should fetch users with pagination', async () => {
    const mockUsers: User[] = [
      { id: '1', email: 'user1@example.com', role: UserRole.USER },
      { id: '2', email: 'user2@example.com', role: UserRole.ADMIN },
    ];

    mockRepository.findAll.mockResolvedValue(mockUsers);

    const result = await service.getUsers(1, 10);

    expect(result).toEqual(mockUsers);
    expect(mockRepository.findAll).toHaveBeenCalledWith({
      offset: 0,
      limit: 10,
    });
  });

  test('should handle errors when fetching users fails', async () => {
    const error = new Error('Database connection failed');
    mockRepository.findAll.mockRejectedValue(error);

    await expect(service.getUsers()).rejects.toThrow(
      'Failed to fetch users: Database connection failed'
    );
  });
});

// Export everything
export { UserService, HttpStatus, processUsers, config };

// Type definitions (would normally be in a separate file)
interface UserRepository {
  findAll(options: { offset: number; limit: number }): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

// Utility function with generics
function createMockRepository<T extends UserRepository>(): jest.Mocked<T> {
  return {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as jest.Mocked<T>;
}
