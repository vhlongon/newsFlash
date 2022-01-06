import { makeAsyncStorage } from '@urql/storage-rn';

export const dataKey = 'flashNews-data';
export const metadataKey = 'flashNews-metadata';

export const storage = makeAsyncStorage({
  dataKey,
  metadataKey,
  maxAge: 5, // in days
});
