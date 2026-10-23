// Pricing helpers for product customisation.

// Selection shape: { size?: "Large", spice?: "Hot", extras?: ["Extra cheese"] }
export function getDefaultSelection(config) {
  const sel = { extras: [] };
  if (config.sizes) sel.size = (config.sizes.find((s) => s.default) || config.sizes[0]).label;
  if (config.spiceLevels) sel.spice = "Medium";
  return sel;
}

// How much the chosen options add to (or remove from) the base price.
export function getOptionsDelta(config, selection) {
  let delta = 0;
  if (config.sizes && selection.size) delta += config.sizes.find((s) => s.label === selection.size)?.price || 0;
  (selection.extras || []).forEach((label) => {
    delta += config.extras?.find((e) => e.label === label)?.price || 0;
  });
  return delta;
}

// Cleaned, stable options object saved in the cart (extras sorted so identical picks merge).
export function buildCartOptions(selection) {
  const out = {};
  if (selection.size) out.size = selection.size;
  if (selection.spice) out.spice = selection.spice;
  if (selection.extras?.length) out.extras = [...selection.extras].sort();
  return out;
}

// "Large · Hot · Extra cheese, Extra sauce"
export function formatOptions(options = {}) {
  const parts = [];
  if (options.size) parts.push(options.size);
  if (options.spice) parts.push(`${options.spice} spice`);
  if (options.extras?.length) parts.push(options.extras.join(", "));
  return parts.join(" · ");
}
