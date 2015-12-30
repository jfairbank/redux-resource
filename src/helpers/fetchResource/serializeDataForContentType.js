import serializeFormData from './serializeFormData';

export default function serializeDataForContentType(data, contentType) {
  if (!data) {
    return;
  }

  if (contentType === 'application/x-www-form-urlencoded') {
    return serializeFormData(data);
  }

  return JSON.stringify(data);
}
