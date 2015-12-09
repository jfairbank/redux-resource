export default function assign(dest, ...sources) {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      dest[key] = source[key];
    });
  });

  return dest;
}
