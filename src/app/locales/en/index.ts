import type { Resource } from 'i18next';
import notFound from './not-found';
import home from './home';
import restClient from './rest-client';
import variables from './variables';

export default { notFound, home, restClient, variables } satisfies Resource;
