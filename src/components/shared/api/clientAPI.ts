import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './build-client';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce_furniture' });

export const getProject = () => apiRoot.get().execute();
