import {
  initializeApp,
  getApps,
  cert,
  getApp,
  type App,
} from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

let app: App;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}
export { auth as ServerAuth };
