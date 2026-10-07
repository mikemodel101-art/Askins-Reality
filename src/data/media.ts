/**
 * Property photography uses resized Pexels CDN images. The founders' portraits
 * are local assets so the homepage does not depend on a third-party image load.
 */

export function photo(id: number, w = 1200, h?: number, ext: "jpeg" | "png" = "jpeg") {
  const dims = h ? `w=${w}&h=${h}` : `w=${w}`;
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&${dims}`;
}

export const IMG = {
  /* ---- exteriors ---- */
  ext: [7031607, 37520984, 8143698, 36777845, 36777987, 17240700, 7546776, 2371976, 36777842, 14074835],
  /* ---- interiors ---- */
  int: [8089172, 8135496, 8082197, 7045921, 7005298, 6782358, 7214456, 7061421, 8135507, 6636314],
  /* ---- aerials / community ---- */
  air: [20227375, 8148350, 15768099, 13976494, 6875496, 7519351, 20227338, 8299335],
  /* ---- lifestyle / people moving in ---- */
  life: [8730048, 7937959, 8470807, 8470805, 4246268, 4246062, 5482207, 4246029],
  /* ---- construction ---- */
  build: [33405084, 33404353, 209266, 37499254, 8961555, 34304714, 33954649, 8961257],
  /* ---- Texas skylines ---- */
  city: [20185085, 20021121, 37215506, 31474055, 37215508, 37197363, 14177239],
  /* ---- team / agents ---- */
  team: [30004320, 30004315, 10376004, 37842958, 7821743, 34533612],
};

/** Rotate through a collection deterministically so cards never repeat side by side. */
export function pick(pool: number[], i: number, w = 900, h = 620) {
  const id = pool[Math.abs(i) % pool.length];
  return photo(id, w, h);
}

export const HERO_IMAGES = {
  home: photo(7031607, 1800, 1100),
  aerial: photo(6875496, 1800, 1000),
  keys: photo(7937959, 1400, 900),
  build: photo(33405084, 1400, 900),
  austin: photo(20021121, 1800, 1000),
  dallas: photo(31474055, 1400, 900),
  dallasNight: photo(31474051, 1800, 700),
  dallasOldRed: photo(9921191, 1400, 900, "png"),
  houston: photo(14177239, 1400, 900),
  family: photo(4246268, 1400, 900),
  sold: photo(10376004, 900, 1200),
  kitchen: photo(8082197, 1200, 800),
  founders: "/images/founders.jpg",
  foundersHero: "/images/founders-hero-wide.jpg",
  heroHouse: photo(8143698, 1400, 1000),
};
