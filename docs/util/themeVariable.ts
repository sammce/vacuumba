export default function tv(property: string) {
  const arrProperty = property.split(".");
  return `var(--lccs-${arrProperty.join("-")})`;
}
