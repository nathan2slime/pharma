import { AuthServices } from '../../../src/services/auth.services';

describe('authentication services', () => {
  const authServices = new AuthServices('en');

  const newUser = {
    email: 'nathan3boss@gmail.com',
    password: 'nathan12345',
    username: 'nathan3boss',
  };

  it('should create a user', async () => {
    const { user, token } = await authServices.signup(newUser);

    expect(user.username).toBe(newUser.username);
    expect(user.email).toBe(newUser.email);
    expect(token).not.toBe(null);
  });

  it('should create and authenticate the user', async () => {
    await authServices.signup(newUser);
    const { user, token } = await authServices.login(newUser);

    expect(user.username).toBe(newUser.username);
    expect(user.email).toBe(newUser.email);
    expect(token).not.toBeNull();
  });

  it('should return error if user is already registered', async () => {
    await authServices.signup(newUser);

    try {
      await authServices.signup(newUser);
      fail();
    } catch (error) {
      expect(error.message).toBe('727');
    }
  });

  it('should return error when trying to login with non-existent user', async () => {
    try {
      await authServices.login({
        email: 'example@gmail.com',
        password: 'example',
      });

      fail();
    } catch (error) {
      expect(error.message).toBe('721');
    }
  });

  it('should return error when trying to login with invalid password', async () => {
    try {
      await authServices.signup(newUser);
      await authServices.login({
        email: newUser.email,
        password: 'example',
      });

      fail();
    } catch (error) {
      expect(error.message).toBe('725');
    }
  });

  it('must create user and validate authentication token', async () => {
    const { token, user } = await authServices.signup(newUser);
    const res = await authServices.getUserByToken(token);

    expect(user._id).toBe(res._id);
  });

  it('must login with user and validate authentication token', async () => {
    await authServices.signup(newUser);
    const { token, user } = await authServices.login({
      email: newUser.email,
      password: newUser.password,
    });

    const res = await authServices.getUserByToken(token);

    expect(user._id).toBe(res._id);
  });

  it('should return error when trying to validate authentication token', async () => {
    try {
      await authServices.getUserByToken('');
    } catch (error) {
      expect(error.message).toBe('111');
    }
  });
});
