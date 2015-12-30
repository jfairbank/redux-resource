import mapKeys from '../mapKeys';

export default function normalizeHeaders(headers = {}) {
  return mapKeys(headers, key => key.toLowerCase().trim());
}
