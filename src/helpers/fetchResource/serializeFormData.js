export default function serializeFormData(data) {
  return Object.keys(data).map((key) => (
    `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
  )).join('&');
}
