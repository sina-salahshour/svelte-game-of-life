import { googleAuth } from '$lib/server/lucia';

import type { RequestHandler } from '../$types';
import { oauthTemplate } from '../oauth-template';

export const GET: RequestHandler = oauthTemplate(googleAuth);
