// Test file to verify TXI style guide rules

// Should pass: proper function with error context
export function processUser(userId: string): void {
  if (userId === '') {
    throw new Error(`Invalid user ID: ${userId}`);
  }

  /* Processing user - console.warn would be allowed with config */
}

/*
 * Should fail: no semicolon (if uncommented)
 * const x = 5
 */

/*
 * Should fail: double quotes (if uncommented)
 * const message = "hello"
 */

/*
 * Should fail: default export
 * export default function() {}
 */

// Test that should have descriptive name
describe('user service', () => {
  it('should process valid user IDs correctly', () => {
    const testUserId = '123';
    expect(() => processUser(testUserId)).not.toThrow();
  });

  /*
   * Should fail: non-descriptive test name (if uncommented)
   * it('works', () => {});
   */

  /*
   * Should fail: dynamic test data (if uncommented)
   * it('should handle timestamps', () => {
   *   const timestamp = Date.now();
   * });
   */
});
