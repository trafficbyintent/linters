/*
 * TEST FIXTURE FILE - NOT AN EXAMPLE
 * This file is used by automated tests to validate linting rules.
 * For JavaScript code examples, see docs/examples/JAVASCRIPT_TEST_EXAMPLES.md
 */

// const express = require('express'); // For linting - used in real app
const { validateEmail, hashPassword } = require('./utils');

// Constants in UPPER_SNAKE_CASE
const DEFAULT_PAGE_SIZE = 20;
const MAX_RETRIES = 3;

// Object with proper formatting and trailing commas
const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  timeout: 5000,
  retries: MAX_RETRIES,
  features: {
    authentication: true,
    logging: true,
    caching: false,
  },
};

// Classes using ES6 syntax
class UserService {
  constructor(repository) {
    this.repository = repository;
    this.cache = new Map();
  }

  // Async methods with proper error handling
  async getUsers(page = 1, pageSize = DEFAULT_PAGE_SIZE) {
    try {
      const offset = (page - 1) * pageSize;
      const users = await this.repository.findAll({ offset, limit: pageSize });

      // Cache the results
      users.forEach((user) => {
        this.cache.set(user.id, user);
      });

      return users;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  // Arrow functions for class methods
  getUserFromCache = (userId) => this.cache.get(userId) || null;

  // Method with default parameters
  async createUser(userData, options = {}) {
    const { sendWelcomeEmail = true, validateImmediately = true } = options;

    if (validateImmediately && !validateEmail(userData.email)) {
      throw new Error('Invalid email address');
    }

    const hashedPassword = await hashPassword(userData.password);
    const user = await this.repository.create({
      ...userData,
      password: hashedPassword,
    });

    if (sendWelcomeEmail) {
      await this.sendWelcomeEmail(user);
    }

    return user;
  }

  async sendWelcomeEmail(_user) {
    // Implementation would go here
    console.warn('Welcome email feature not implemented yet');
  }
}

// Express route handlers with proper async handling
const createUserHandler = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['email', 'password', 'name'],
      });
    }

    // In a real app, userService would be injected or imported
    const userService = new UserService(/* repository injected here */);
    const user = await userService.createUser({ email, password, name });

    res.status(201).json({
      data: user,
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Array methods with proper formatting
const processUsers = (users) =>
  users
    .filter((user) => user.isActive)
    .map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

// Promise handling
const fetchUserData = (userId) =>
  fetch(`${config.apiUrl}/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.error('Error fetching user data:', error);
      throw error;
    });

// Modern async/await syntax
const batchProcessUsers = async (userIds) => {
  const results = await Promise.allSettled(userIds.map((id) => fetchUserData(id)));

  const successful = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);

  const failed = results
    .filter((result) => result.status === 'rejected')
    .map((result, index) => ({
      userId: userIds[index],
      error: result.reason.message,
    }));

  return { successful, failed };
};

// Destructuring and rest parameters
const createApiClient = ({ baseUrl, timeout = 5000, ...options }) => ({
  baseUrl,
  timeout,
  options,

  async request(endpoint, { method = 'GET', body, ...requestOptions } = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...requestOptions.headers,
      },
      ...requestOptions,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  },
});

// Module exports
module.exports = {
  UserService,
  createUserHandler,
  processUsers,
  fetchUserData,
  batchProcessUsers,
  createApiClient,
  config,
};

// Example usage (would normally be in a separate file)
if (require.main === module) {
  const userService = new UserService({
    findAll: async () => [],
    create: async (data) => ({ id: '123', ...data }),
  });

  // Example of using the service
  userService
    .getUsers()
    .then((users) => {
      console.warn(`Found ${users.length} users`);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
}
