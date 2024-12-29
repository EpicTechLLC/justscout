export default function safeValue(value: any) {
  return value === null || value === undefined ? "-" : value;
}
