import { AuthServices } from '../../src/services/auth.services';
import { User } from '../../src/database/schemas/user.schema';

describe('authentication services', () => {
  let authServices: AuthServices;

  beforeAll(() => {
    authServices = new AuthServices('en');
  });

  const newUser = {
    email: 'example@gmail.co',
    password: 'nathan12345',
    username: 'nathan3boss',
  };

  describe('signup', () => {
    it('should create a user', async () => {
      const { user, token } = await authServices.signup(newUser);

      expect(user).toMatchObject({
        username: newUser.username,
        email: newUser.email,
      });
      expect(token).not.toBe(null);
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
  });

  describe('login', () => {
    const newUser = {
      email: 'example@gmail.co',
      password: 'nathan12345',
      username: 'nathan3boss',
    };

    beforeEach(async () => {
      await authServices.signup(newUser);
    });

    it('should create and authenticate the user', async () => {
      const { user, token } = await authServices.login(newUser);

      expect(user).toMatchObject({
        email: newUser.email,
        username: newUser.username,
      });
      expect(token).not.toBeNull();
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
        await authServices.login({
          email: newUser.email,
          password: 'example',
        });

        fail();
      } catch (error) {
        expect(error.message).toBe('725');
      }
    });
  });

  describe('get user by token', () => {
    let _token: string;
    let _user: User;

    beforeEach(async () => {
      const res = await authServices.signup(newUser);
      _token = res.token;
      _user = res.user;
    });

    it('must create user and validate authentication token', async () => {
      const res = await authServices.getUserByToken(_token);

      expect(_user._id).toBe(res._id);
    });

    it('must login with user and validate authentication token', async () => {
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
});
