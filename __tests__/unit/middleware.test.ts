import { DisplayUserDTO } from "@/crud/DTOs";
import { Role} from "@prisma/client";

import { describe, expect, it, afterAll } from "@jest/globals";
import { HttpMethod, verifyAccess } from "@/lib/middleware";

describe('verifyAccess function', () => {
  const CUID_1 = 'ck2n7jngh0000t2r11g1mvzv3';
  const CUID_2 = 'ck2n7jngh0000t2r11g1mvzv5';
  const UUID_1 = '123e4567-e89b-12d3-a456-426614174001';
  const UUID_2 = '123e4567-e89b-12d3-a456-426614174004';  
  const user: DisplayUserDTO = {
    // Define a user object for testing
    // Adjust the properties based on your actual user structure
    id: CUID_1,
    role: Role.USER,
    email: 'user@example.com',
    emailVerified:undefined,
    // ... other properties ...
  };
  const superUser:DisplayUserDTO ={
    id: CUID_1,
    role: Role.SUPERUSER,
    email: 'user@example.com',
    emailVerified:undefined,
  }
  const adminUser:DisplayUserDTO ={
    id: CUID_1,
    role: Role.ADMIN,
    email: 'user@example.com',
    emailVerified:undefined,
  }
  const trustedUser:DisplayUserDTO ={
    id: CUID_1,
    role: Role.TRUSTED,
    email: 'user@example.com',
    emailVerified:undefined,
  }

  it('should allow access for SUPERUSER', async () => {
    const superUser: DisplayUserDTO = {
      ...user,
      role: Role.SUPERUSER,
    };

    const hasAccess = await verifyAccess(superUser, '/api/users/ck2n7jngh0000t2r11g1mvzv3', 'GET');
    expect(hasAccess).toBe(true);
  });

  it('should allow access for ADMIN', async () => {
    const adminUser: DisplayUserDTO = {
      ...user,
      role: Role.ADMIN,
    };

    const hasAccess = await verifyAccess(adminUser, '/api/users/ck2n7jngh0000t2r11g1mvzv3', 'GET');
    expect(hasAccess).toBe(true);
  });

  it('should allow access for specific USER conditions', async () => {
    // Define a user with the USER role for testing
    const normalUser: DisplayUserDTO = {
      ...user,
      role: Role.USER,
    };

    // Test various access scenarios
    const testCases = [
      { path: '/api/products/41e4904a-9acc-11ee-816c-52a30caa17b1', method: 'GET', expected: true },
      { path: '/api/products/all', method: 'GET', expected: true },
      // Add more test cases based on your conditions
    ];

    for (const testCase of testCases) {
      const hasAccess = await verifyAccess(normalUser, testCase.path, testCase.method as HttpMethod);
      expect(hasAccess).toBe(testCase.expected);
    }
  });


  it('allows access to specific paths for USER', async () => {
    const userWithAccess = { ...user, role: Role.USER, id: `${CUID_1}` };
    const allowedPaths = [
      {path: `/api/products/${UUID_1}`, method: 'GET',},
      {path: `/api/products/all`, method: 'GET', },
      {path: `/api/services/${UUID_1}`, method: 'GET',},
      {path: `/api/products/${UUID_1}`, method: 'GET', },
        {path: `/api/users/${CUID_1}`, method: 'GET'},
        {path: `/api/users/${CUID_1}`, method: 'PUT'},
        {path: `/api/cart/services/${CUID_1}`, method: 'POST', },
        {path: `/api/cart/services/${CUID_1}`, method: 'GET', },



    ];
    const protectedPaths = [
      {path:`/api/users/all`, method: 'GET'},
      {path: `/api/users/${CUID_2}`, method: 'GET'},
      {path: `/api/products/${UUID_1}`, method: 'PUT', },
      {path: `/api/products/${UUID_1}`, method: 'POST', },
      {path: `/api/cart/services/${UUID_1}`, method: 'POST', },
      {path: `/api/cart/services/${UUID_1}`, method: 'GET', },
    ]

    const accessPromises = allowedPaths.map((testCase) =>
      verifyAccess(userWithAccess, testCase.path, testCase.method as HttpMethod)
    );  
    const protectedPromises = protectedPaths.map((testCase) =>
      verifyAccess( userWithAccess,testCase.path, testCase.method as HttpMethod)
    );
    const accessResults = await Promise.all(accessPromises);
    const protectedResults = await Promise.all(protectedPromises);

    console.log(accessResults);
    expect(protectedResults.every((result) => result===false)).toBe(true);

    expect(accessResults.every((result) => result === true)).toBe(true);
  });

  // Add more test cases for other scenarios and paths as needed
  it('allows access to all paths for SUPERUSER', async () => {
    const allowedPaths = [
      {path: `/api/products/${UUID_1}`, method: 'GET',},
      {path: `/api/products/all`, method: 'GET', },
      {path: `/api/services/${UUID_1}`, method: 'GET',},
      {path: `/api/products/${UUID_1}`, method: 'GET', },
      {path: `/api/users/${CUID_1}`, method: 'GET'},
      {path: `/api/users/${CUID_1}`, method: 'PUT'},
      {path:`/api/users/all`, method: 'GET'},
      {path: `/api/users/${CUID_2}`, method: 'GET'},
      {path: `/api/products/${UUID_1}`, method: 'PUT', },
      {path: `/api/products/${UUID_1}`, method: 'POST', },
      {path: `/api/cart/services/${CUID_1}`, method: 'POST', },

    ];

    const accessPromises = allowedPaths.map((testCase) =>
      verifyAccess(superUser, testCase.path, testCase.method as HttpMethod)
    );  
    const accessResults = await Promise.all(accessPromises);
    expect(accessResults.every((result) => result === true)).toBe(true);

  });

  it('allows access to all paths for ADMIN', async () => {
    const allowedPaths = [
      {path: `/api/products/${UUID_1}`, method: 'GET',},
      {path: `/api/products/all`, method: 'GET', },
      {path: `/api/services/${UUID_1}`, method: 'GET',},
      {path: `/api/products/${UUID_1}`, method: 'GET', },
      {path: `/api/users/${CUID_1}`, method: 'GET'},
      {path: `/api/users/${CUID_1}`, method: 'PUT'},
      {path:`/api/users/all`, method: 'GET'},
      {path: `/api/users/${CUID_2}`, method: 'GET'},
      {path: `/api/products/${UUID_1}`, method: 'PUT', },
      {path: `/api/cart/services/${CUID_1}`, method: 'POST', },
      {path: `/api/cart/services/${CUID_1}`, method: 'POST', },

    ];

    const accessPromises = allowedPaths.map((testCase) =>
      verifyAccess(superUser, testCase.path, testCase.method as HttpMethod)
    );  
    const accessResults = await Promise.all(accessPromises);
    expect(accessResults.every((result) => result === true)).toBe(true);
  });
  it('denies access for unknown paths', async () => {
    const unknownPath = '/api/unknown';
    const hasAccess = await verifyAccess(user, unknownPath, 'GET');
    expect(hasAccess).toBe(false);
  });

  it('denies access for invalid method on known paths', async () => {
    const invalidMethodPath = `/api/products/${UUID_1}`;
    const hasAccess = await verifyAccess(user, invalidMethodPath, 'POST');
    expect(hasAccess).toBe(false);
  });

  // Add more test cases for other roles and scenarios...
});
