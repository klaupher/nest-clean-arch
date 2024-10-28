import { BCryptHashProvider } from '@/users/infrastruture/providers/hash-provider/bcrypt-hash.provider';

describe('BCryptHashProvider unit tests', () => {
  let sut: BCryptHashProvider;

  beforeEach(() => {
    sut = new BCryptHashProvider();
  });

  it('Should return encrypt password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    expect(hash).toBeDefined();
  });

  it('Should return false on invalid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash('hash', hash);
    expect(result).toBeFalsy();
  });

  it('Should return true on valid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash(password, hash);
    expect(result).toBeTruthy();
  });
});
