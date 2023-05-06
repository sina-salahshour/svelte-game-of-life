import { githubAuth } from '$lib/server/lucia';
import type { RequestHandler } from '../../$types';

import { authCallbackTemplate } from '../callback-template';

export const GET: RequestHandler = authCallbackTemplate(githubAuth);
