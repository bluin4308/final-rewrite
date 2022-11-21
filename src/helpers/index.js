export function isSale(item) {
  return item.tags.nodes.findIndex((item) => item.name === "sale") > 0;
}
