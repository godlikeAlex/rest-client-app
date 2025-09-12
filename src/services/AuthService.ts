import { session } from '@/app/cookies';
import { serverAuth } from './firebase.server';
export default class AuthService {
  static async generateSessionCookie(idToken: string) {
    await serverAuth.verifyIdToken(idToken);
    const jwt = await serverAuth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 1000,
    });

    return {
      jwt,
      cookieHeader: await session.serialize(jwt),
    };
  }
}
