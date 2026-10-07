import { IMG, pick } from "./media";

/* ------------------------------------------------------------------ *
 *  Texas regions (map + search facets)
 * ------------------------------------------------------------------ */

export type Region = {
  id: string;
  name: string;
  short: string;
  lat: number;
  lng: number;
  blurb: string;
  cities: string[];
  image: string;
};

export const REGIONS: Region[] = [
  {
    id: "dfw",
    name: "Dallas–Fort Worth",
    short: "DFW",
    lat: 32.86,
    lng: -96.9,
    blurb: "Master-planned giants, top ISDs, and the deepest quick move-in inventory in the state.",
    cities: ["Frisco", "Celina", "Prosper", "McKinney", "Fort Worth", "Rockwall", "Flower Mound", "Argyle", "Aubrey", "Waxahachie"],
    image: pick(IMG.air, 1, 900, 620),
  },
  {
    id: "houston",
    name: "Greater Houston",
    short: "Houston",
    lat: 29.76,
    lng: -95.6,
    blurb: "Value-dense new builds with resort amenity packages from Katy to The Woodlands.",
    cities: ["Katy", "Cypress", "Fulshear", "Richmond", "Spring", "The Woodlands", "Pearland", "League City", "Conroe", "Sugar Land"],
    image: pick(IMG.air, 4, 900, 620),
  },
  {
    id: "austin",
    name: "Austin Metro",
    short: "Austin",
    lat: 30.35,
    lng: -97.7,
    blurb: "Hill Country views, tech-driven growth and aggressive builder incentives.",
    cities: ["Georgetown", "Leander", "Round Rock", "Buda", "Dripping Springs", "Liberty Hill", "Kyle", "Manor", "Hutto", "Bee Cave"],
    image: pick(IMG.city, 2, 900, 620),
  },
  {
    id: "sanantonio",
    name: "San Antonio",
    short: "San Antonio",
    lat: 29.5,
    lng: -98.5,
    blurb: "Texas' best price-per-square-foot with new construction under $400K still available.",
    cities: ["Boerne", "Cibolo", "Schertz", "Helotes", "Bulverde", "Converse", "New Braunfels"],
    image: pick(IMG.air, 6, 900, 620),
  },
  {
    id: "hillcountry",
    name: "Hill Country",
    short: "Hill Country",
    lat: 30.0,
    lng: -98.6,
    blurb: "Acreage estates, wine country lots, and custom builder communities.",
    cities: ["New Braunfels", "Fredericksburg", "Kerrville", "Canyon Lake", "Wimberley", "Johnson City"],
    image: pick(IMG.ext, 6, 900, 620),
  },
  {
    id: "easttx",
    name: "East Texas",
    short: "East TX",
    lat: 32.3,
    lng: -95.3,
    blurb: "Pineywoods living with big lots, low taxes and small-town pricing.",
    cities: ["Tyler", "Longview", "Lindale", "Bullard", "Whitehouse"],
    image: pick(IMG.ext, 3, 900, 620),
  },
  {
    id: "gulf",
    name: "Coastal Bend",
    short: "Coastal",
    lat: 27.9,
    lng: -97.4,
    blurb: "Coastal new construction with windstorm-ready builds near the water.",
    cities: ["Corpus Christi", "Portland", "Rockport", "Port Aransas", "Aransas Pass"],
    image: pick(IMG.ext, 8, 900, 620),
  },
  {
    id: "valley",
    name: "Rio Grande Valley",
    short: "Valley",
    lat: 26.3,
    lng: -98.1,
    blurb: "The most affordable new construction market in Texas.",
    cities: ["McAllen", "Edinburg", "Brownsville", "Mission", "Harlingen", "Weslaco"],
    image: pick(IMG.ext, 2, 900, 620),
  },
  {
    id: "permian",
    name: "Permian Basin",
    short: "Permian",
    lat: 31.95,
    lng: -102.3,
    blurb: "Energy-boom housing with fast build timelines and low inventory days.",
    cities: ["Midland", "Odessa", "Andrews"],
    image: pick(IMG.build, 2, 900, 620),
  },
  {
    id: "elpaso",
    name: "El Paso",
    short: "El Paso",
    lat: 31.76,
    lng: -106.4,
    blurb: "Mountain-view new homes with some of the lowest HOAs in the state.",
    cities: ["El Paso", "Horizon City", "Socorro"],
    image: pick(IMG.city, 6, 900, 620),
  },
];

/* ------------------------------------------------------------------ *
 *  Builders
 * ------------------------------------------------------------------ */

export type Builder = {
  name: string;
  slug: string;
  hq: string;
  homesPerYear: string;
  rebatePct: number;
  incentive: string;
  regions: string[];
  note: string;
};

export const BUILDERS: Builder[] = [
  { name: "D.R. Horton", slug: "dr-horton", hq: "Arlington, TX", homesPerYear: "~82,000", rebatePct: 3, incentive: "Up to $35K flex cash + 4.99% rate", regions: ["dfw", "houston", "austin", "sanantonio", "gulf", "elpaso", "valley", "permian"], note: "Largest US builder, deepest quick move-in inventory." },
  { name: "Lennar", slug: "lennar", hq: "Miami, FL", homesPerYear: "~73,000", rebatePct: 3, incentive: "Forward rates from 3.99% + closing costs", regions: ["dfw", "houston", "austin", "sanantonio", "valley"], note: "Everything's Included® packages with smart home tech standard." },
  { name: "Perry Homes", slug: "perry-homes", hq: "Houston, TX", homesPerYear: "~3,400", rebatePct: 2.5, incentive: "$25K design studio credit or rate buydown", regions: ["dfw", "houston", "austin", "sanantonio"], note: "Texas family builder, iconic elevations, high ceilings." },
  { name: "Highland Homes", slug: "highland-homes", hq: "Dallas, TX", homesPerYear: "~2,200", rebatePct: 2.5, incentive: "$20K flex cash + 2/1 rate buydown", regions: ["dfw", "houston", "austin", "hillcountry", "sanantonio"], note: "Architectural flexibility, premium master plans, top ISDs." },
  { name: "Coventry Homes", slug: "coventry-homes", hq: "Houston, TX", homesPerYear: "~1,600", rebatePct: 2.5, incentive: "Eco-Smart solar package + $15K closing credit", regions: ["dfw", "houston", "austin", "gulf", "hillcountry"], note: "Energy-efficient standard features, built around green living." },
  { name: "David Weekley Homes", slug: "david-weekley", hq: "Houston, TX", homesPerYear: "~3,000", rebatePct: 2.5, incentive: "$18K design credit + permanent rate buydown", regions: ["dfw", "houston", "austin", "sanantonio"], note: "Custom Choice™ design flexibility leader and EnergySaver™ certified." },
  { name: "Chesmar Homes", slug: "chesmar-homes", hq: "San Antonio, TX", homesPerYear: "~1,900", rebatePct: 3, incentive: "Free structural options + $10K closing", regions: ["houston", "austin", "sanantonio", "gulf"], note: "Modern layouts, great starter & move-up pricing." },
  { name: "Toll Brothers", slug: "toll-brothers", hq: "Horsham, PA", homesPerYear: "~10,000", rebatePct: 2, incentive: "$50K design studio allowance", regions: ["dfw", "houston", "austin"], note: "Luxury semi-custom estate homes on oversized lots." },
  { name: "CastleRock Communities", slug: "castlerock", hq: "Houston, TX", homesPerYear: "~1,400", rebatePct: 3, incentive: "$15K move-in bundle + appliance package", regions: ["houston", "austin", "easttx", "valley", "hillcountry"], note: "High-value floor plans with fast build cycles." },
  { name: "Bloomfield Homes", slug: "bloomfield", hq: "Southlake, TX", homesPerYear: "~900", rebatePct: 2.5, incentive: "$14K design credit + covered patio", regions: ["dfw", "austin"], note: "DFW boutique powerhouse with rich architectural millwork." },
  { name: "Tri Pointe Homes", slug: "tri-pointe", hq: "Incline Village, NV", homesPerYear: "~6,400", rebatePct: 2.5, incentive: "2/1 rate buydown + LivingSmart® tech", regions: ["dfw", "houston", "austin"], note: "Design-driven contemporary aesthetics with wellness features." },
  { name: "KB Home", slug: "kb-home", hq: "Los Angeles, CA", homesPerYear: "~13,000", rebatePct: 3, incentive: "Zero-down options + $8K closing assist", regions: ["austin", "houston", "elpaso", "valley", "sanantonio"], note: "Built to Order™ customizability with Energy Star ratings." },
  { name: "Ashton Woods", slug: "ashton-woods", hq: "Atlanta, GA", homesPerYear: "~8,000", rebatePct: 2, incentive: "$30K Studio by Ashton Woods credit", regions: ["dfw", "houston", "austin", "sanantonio"], note: "Award-winning designer curated collections." },
  { name: "Meritage Homes", slug: "meritage", hq: "Scottsdale, AZ", homesPerYear: "~15,000", rebatePct: 3, incentive: "100% Energy Star + spray foam + $12K closing", regions: ["houston", "austin", "dfw", "sanantonio"], note: "Quiet, energy-efficient spray foam insulation standard." },
  { name: "Betenbough Homes", slug: "betenbough", hq: "Lubbock, TX", homesPerYear: "~1,200", rebatePct: 3, incentive: "Closing costs paid up to $10,000", regions: ["permian", "dfw"], note: "West Texas affordability leader with quick delivery." },
  { name: "Raby Custom Homes", slug: "raby-custom", hq: "Tyler, TX", homesPerYear: "~120", rebatePct: 2, incentive: "Free outdoor kitchen package", regions: ["easttx"], note: "East Texas custom luxury specialist on acreage." },
  { name: "Gehan Homes", slug: "gehan-homes", hq: "Dallas, TX", homesPerYear: "~1,100", rebatePct: 3, incentive: "$12K flex cash + free blinds & fridge", regions: ["dfw", "houston", "austin", "easttx", "hillcountry"], note: "Spacious plans with high resale value across Texas." },
  { name: "Brightland Homes", slug: "brightland-homes", hq: "Dallas, TX", homesPerYear: "~1,800", rebatePct: 2.5, incentive: "4.75% fixed rate + $15K in options", regions: ["dfw", "houston", "austin", "sanantonio"], note: "Refined family-centric floor plans with flex rooms." },
];

/* ------------------------------------------------------------------ *
 *  Listings (110+ Homes Dummy MLS VOW feed)
 * ------------------------------------------------------------------ */

export type Status = "quick" | "ucs" | "tbb";

export type Listing = {
  mls: string;
  city: string;
  regionId: string;
  community: string;
  builder: string;
  plan: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lat: number;
  lng: number;
  status: Status;
  dom: number;
  garage: number;
  hoa: number;
  lot: string;
  rebate: number;
  rebatePct: number;
  pricePerSqft: number;
  slug: string;
  images: string[];
  highlights: string[];
  schools: { el: string; mid: string; high: string };
};

type Row = [string, string, string, string, string, string, number, number, number, number, number, number, Status];

const ROWS: Row[] = [
  // --- DFW (24 homes) ---
  ["2065-4412", "Celina", "dfw", "Mustang Lakes", "Highland Homes", "Plan 2241", 629900, 4, 3.5, 3148, 33.3245, -96.7999, "quick"],
  ["2071-8890", "Frisco", "dfw", "Fields – Falcon Ranch", "David Weekley Homes", "Crestwood", 845000, 4, 4.5, 3820, 33.1941, -96.8347, "ucs"],
  ["2064-2210", "McKinney", "dfw", "Trinity Falls", "D.R. Horton", "Sienna", 512900, 4, 3, 2650, 33.2712, -96.6111, "quick"],
  ["2068-1104", "Prosper", "dfw", "Light Farms", "Perry Homes", "Plan 2742", 739000, 5, 4, 3512, 33.2362, -96.7919, "tbb"],
  ["2059-3377", "Flower Mound", "dfw", "Canyon Falls", "Highland Homes", "Plan 1938", 689500, 4, 3.5, 3074, 33.0202, -97.0874, "quick"],
  ["2072-9921", "Fort Worth", "dfw", "Walsh", "Ashton Woods", "Marlowe II", 594900, 4, 3, 2810, 32.7403, -97.5218, "ucs"],
  ["2066-4410", "Arlington", "dfw", "Viridian", "Gehan Homes", "Camden", 498900, 3, 2.5, 2310, 32.7964, -97.1045, "quick"],
  ["2073-7712", "Rockwall", "dfw", "Breezy Hill", "Bloomfield Homes", "Stonebridge", 659900, 4, 3.5, 3201, 32.8983, -96.4383, "quick"],
  ["2074-3301", "Forney", "dfw", "Devonshire", "CastleRock Communities", "Lantana", 429900, 4, 3, 2540, 32.7482, -96.4621, "tbb"],
  ["2075-6654", "Waxahachie", "dfw", "Glen Ridge", "Coventry Homes", "Plan 5824", 468500, 4, 3, 2680, 32.3865, -96.8483, "ucs"],
  ["2076-8845", "Little Elm", "dfw", "Union Park", "Tri Pointe Homes", "Aldrin", 547900, 4, 3, 2905, 33.1635, -96.9387, "quick"],
  ["2077-1099", "Argyle", "dfw", "Canyon Falls West", "Toll Brothers", "Villanova", 925000, 5, 5, 4310, 33.1194, -97.1821, "ucs"],
  ["2078-4521", "Aubrey", "dfw", "Sandbrock Ranch", "Perry Homes", "Plan 2514", 519000, 4, 3, 2580, 33.3012, -96.9845, "quick"],
  ["2079-8832", "Celina", "dfw", "Green Meadows", "Lennar", "Ridgestone", 479900, 4, 3, 2460, 33.3421, -96.8712, "quick"],
  ["2080-6611", "Frisco", "dfw", "The Grove Frisco", "Highland Homes", "Plan 2140", 789000, 4, 3.5, 3400, 33.1582, -96.7621, "tbb"],
  ["2081-3344", "Prosper", "dfw", "Windsong Ranch", "David Weekley Homes", "Somerville", 899000, 5, 4.5, 4120, 33.2451, -96.8412, "quick"],
  ["2082-9901", "McKinney", "dfw", "Painted Tree", "Tri Pointe Homes", "Cadence", 615000, 4, 3.5, 2950, 33.2289, -96.6542, "ucs"],
  ["2083-4477", "Fort Worth", "dfw", "Tavolo Park", "Brightland Homes", "Georgetown", 489000, 4, 2.5, 2490, 32.6512, -97.4321, "quick"],
  ["2084-1188", "Mansfield", "dfw", "Ladera Mansfield", "Bloomfield Homes", "Primrose FE", 535000, 3, 2.5, 2710, 32.5641, -97.1425, "quick"],
  ["2085-7766", "Aledo", "dfw", "Morningstar", "Highland Homes", "Plan 1890", 610000, 4, 3, 2820, 32.7214, -97.6012, "ucs"],
  ["2086-2255", "Northlake", "dfw", "Pecan Square", "Perry Homes", "Plan 2814", 589000, 4, 3.5, 3110, 33.0921, -97.2645, "quick"],
  ["2087-9933", "Justin", "dfw", "Timberbrook", "D.R. Horton", "Kingston", 449900, 4, 2.5, 2380, 33.0845, -97.2941, "quick"],
  ["2088-5511", "Midlothian", "dfw", "Prairie Ridge", "CastleRock Communities", "Rio Grande", 419000, 4, 3, 2450, 32.5312, -97.0245, "tbb"],
  ["2089-7744", "Princeton", "dfw", "Monticello Park", "Meritage Homes", "Fairview", 379900, 3, 2, 1920, 33.1845, -96.4921, "quick"],

  // --- Houston Metro (24 homes) ---
  ["3001-2214", "Katy", "houston", "Cross Creek Ranch", "Perry Homes", "Plan 3518", 579900, 4, 3.5, 3125, 29.7945, -95.9219, "quick"],
  ["3002-8891", "Fulshear", "houston", "Jordan Ranch", "Highland Homes", "Plan 2156", 655000, 4, 4, 3410, 29.6923, -95.8967, "ucs"],
  ["3003-4432", "Cypress", "houston", "Bridgeland", "D.R. Horton", "Aspen II", 489900, 4, 3, 2655, 30.0104, -95.6945, "quick"],
  ["3004-1109", "Richmond", "houston", "Aliana", "David Weekley Homes", "Wexford", 612000, 4, 3.5, 3080, 29.5826, -95.6862, "tbb"],
  ["3005-7723", "Spring", "houston", "The Springs", "Chesmar Homes", "Plan 2246", 449900, 4, 3, 2610, 30.0799, -95.4172, "quick"],
  ["3006-9987", "The Woodlands", "houston", "Creekside Park West", "Toll Brothers", "Rosewood", 879000, 5, 4.5, 4120, 30.1602, -95.4613, "ucs"],
  ["3007-3312", "Pearland", "houston", "Meridiana", "Coventry Homes", "Plan 7140", 524900, 4, 3.5, 2940, 29.563, -95.286, "quick"],
  ["3008-6645", "Humble", "houston", "The Highlands", "Gehan Homes", "Ashwood", 398900, 4, 2.5, 2410, 30.0016, -95.2697, "tbb"],
  ["3009-1178", "Manvel", "houston", "Pomona", "CastleRock Communities", "Brazos", 459900, 4, 3, 2720, 29.4925, -95.3662, "quick"],
  ["3010-5567", "League City", "houston", "Magnolia Creek", "Tri Pointe Homes", "Gentry", 508000, 4, 3, 2875, 29.5045, -95.0852, "ucs"],
  ["3011-8822", "Katy", "houston", "Elyson", "Highland Homes", "Plan 2045", 589000, 4, 3, 2980, 29.8645, -95.7845, "quick"],
  ["3012-3399", "Fulshear", "houston", "Cross Creek West", "Lennar", "Brookstone", 465000, 4, 2.5, 2510, 29.6741, -95.9412, "quick"],
  ["3013-7744", "Cypress", "houston", "Marvida", "KB Home", "Plan 2180", 389900, 3, 2, 2180, 29.9214, -95.7145, "quick"],
  ["3014-9911", "Conroe", "houston", "Grand Central Park", "David Weekley Homes", "Brackenridge", 545000, 4, 3.5, 2890, 30.2812, -95.4621, "ucs"],
  ["3015-4422", "Sugar Land", "houston", "Imperial", "Meritage Homes", "Avondale", 675000, 4, 4, 3320, 29.6145, -95.6312, "quick"],
  ["3016-1155", "Tomball", "houston", "Amira", "Perry Homes", "Plan 2620", 529000, 4, 3, 2740, 30.0945, -95.6214, "tbb"],
  ["3017-6688", "Rosenberg", "houston", "Summer Lakes", "D.R. Horton", "Easton", 369900, 4, 2, 2120, 29.5412, -95.7745, "quick"],
  ["3018-2233", "Missouri City", "houston", "Sienna", "Toll Brothers", "Valencia", 815000, 5, 4.5, 3950, 29.5124, -95.5312, "ucs"],
  ["3019-8877", "Baytown", "houston", "Chambers Creek", "Chesmar Homes", "Lanier", 419000, 3, 2.5, 2350, 29.7845, -94.9412, "quick"],
  ["3020-5544", "Magnolia", "houston", "Audubon", "Coventry Homes", "Plan 6210", 495000, 4, 3, 2690, 30.2145, -95.7312, "quick"],
  ["3021-3311", "Iowa Colony", "houston", "Sterling Lakes", "CastleRock Communities", "Silverado", 349900, 3, 2, 1980, 29.4612, -95.4125, "quick"],
  ["3022-7788", "Montgomery", "houston", "Woodforest", "Perry Homes", "Plan 3120", 639000, 4, 3.5, 3240, 30.3124, -95.5412, "ucs"],
  ["3023-9966", "Willis", "houston", "The Woodlands Hills", "Brightland Homes", "Kerrville", 439000, 4, 2.5, 2480, 30.4124, -95.5012, "quick"],
  ["3024-1144", "Waller", "houston", "Beacon Hill", "Lennar", "Bramante", 379000, 3, 2, 2040, 30.0612, -95.9145, "quick"],

  // --- Austin Metro (20 homes) ---
  ["4001-2245", "Georgetown", "austin", "Wolf Ranch", "Gehan Homes", "Plan 2714", 519900, 4, 3, 2745, 30.6333, -97.677, "quick"],
  ["4002-8890", "Leander", "austin", "Travisso", "Coventry Homes", "Plan 6120", 689000, 4, 3.5, 3210, 30.5659, -97.8925, "ucs"],
  ["4003-4412", "Pflugerville", "austin", "Springbrook Center", "Lennar", "Vista", 429900, 4, 3, 2380, 30.4397, -97.62, "quick"],
  ["4004-1101", "Round Rock", "austin", "Paloma Lake", "D.R. Horton", "Juniper", 476500, 4, 2.5, 2560, 30.5083, -97.6789, "quick"],
  ["4005-7734", "Buda", "austin", "Sunfield", "Chesmar Homes", "Plan 2821", 468000, 4, 3, 2680, 30.0635, -97.833, "tbb"],
  ["4006-9921", "Kyle", "austin", "Plum Creek", "CastleRock Communities", "Cypress", 389900, 3, 2, 2010, 29.9887, -97.8732, "quick"],
  ["4007-3345", "Dripping Springs", "austin", "Caliterra", "Highland Homes", "Plan 1820", 745000, 4, 4, 3420, 30.1902, -98.0867, "ucs"],
  ["4008-6612", "Manor", "austin", "Shadowglen", "KB Home", "Plan 1892", 359900, 3, 2, 1820, 30.3407, -97.5567, "quick"],
  ["4009-1189", "Hutto", "austin", "Creekside Park", "Bloomfield Homes", "Lakewood", 442900, 4, 3, 2510, 30.5425, -97.5468, "ucs"],
  ["4010-5523", "Liberty Hill", "austin", "Santa Rita Ranch", "Perry Homes", "Plan 2748", 629000, 5, 4, 3510, 30.6635, -97.8943, "quick"],
  ["4011-8844", "Bee Cave", "austin", "Sweetwater", "Toll Brothers", "Montclaire", 949000, 5, 4.5, 4280, 30.3124, -98.0245, "ucs"],
  ["4012-3377", "Georgetown", "austin", "Sun City Texas", "David Weekley Homes", "Belmont", 565000, 3, 2.5, 2620, 30.6845, -97.7412, "quick"],
  ["4013-7711", "Leander", "austin", "Bar W Ranch", "Brightland Homes", "Rockport", 495000, 4, 3, 2580, 30.5921, -97.8412, "quick"],
  ["4014-9955", "Jarrell", "austin", "Sonterra", "Lennar", "Harmony", 299900, 3, 2, 1680, 30.8245, -97.6012, "quick"],
  ["4015-4488", "Bastrop", "austin", "Colony Bend", "D.R. Horton", "Redbud", 349900, 4, 2, 2140, 30.1124, -97.3214, "quick"],
  ["4016-1122", "Lakeway", "austin", "Rough Hollow", "Coventry Homes", "Plan 7410", 875000, 4, 4, 3810, 30.3541, -97.9845, "ucs"],
  ["4017-6633", "Round Rock", "austin", "Teravista", "Tri Pointe Homes", "Sonora", 589000, 4, 3.5, 3020, 30.5612, -97.6612, "quick"],
  ["4018-2299", "San Marcos", "austin", "Trace", "Highland Homes", "Plan 1940", 415000, 3, 2.5, 2280, 29.8412, -97.9612, "quick"],
  ["4019-8866", "Dripping Springs", "austin", "Headwaters", "David Weekley Homes", "Westlake", 719000, 4, 3.5, 3310, 30.2012, -98.0512, "quick"],
  ["4020-5588", "Elgin", "austin", "Saratoga Farms", "CastleRock Communities", "Barton", 335000, 3, 2, 1860, 30.3512, -97.3745, "quick"],

  // --- San Antonio Metro (16 homes) ---
  ["5001-2231", "Boerne", "sanantonio", "Montana Springs", "Highland Homes", "Plan 1992", 725000, 4, 3.5, 3180, 29.7947, -98.7319, "ucs"],
  ["5002-8894", "Cibolo", "sanantonio", "Windmill Farms", "D.R. Horton", "Magnolia", 429900, 4, 3, 2580, 29.5613, -98.2269, "quick"],
  ["5003-4402", "Schertz", "sanantonio", "Cibolo Valley", "Chesmar Homes", "Plan 2238", 412000, 4, 2.5, 2440, 29.5823, -98.27, "quick"],
  ["5004-1198", "San Antonio", "sanantonio", "Alamo Ranch", "Lennar", "Heritage", 389900, 4, 3, 2320, 29.4447, -98.6611, "tbb"],
  ["5005-7723", "Bulverde", "sanantonio", "Mission Hill Ranch", "David Weekley Homes", "Sagebrook", 589900, 4, 3.5, 3020, 29.7449, -98.4553, "quick"],
  ["5006-9911", "Helotes", "sanantonio", "Estates at Helotes", "Perry Homes", "Plan 2812", 679900, 5, 4, 3580, 29.5766, -98.6821, "ucs"],
  ["5007-3356", "San Antonio", "sanantonio", "Fog Ranch", "Lennar", "Sierra", 349900, 3, 2, 1760, 29.3833, -98.5033, "quick"],
  ["5008-8833", "Boerne", "sanantonio", "Esperanza", "Coventry Homes", "Plan 5910", 695000, 4, 3.5, 3290, 29.8145, -98.6945, "quick"],
  ["5009-4466", "Converse", "sanantonio", "MacArthur Park", "CastleRock Communities", "Colorado", 329000, 3, 2, 1890, 29.5124, -98.3124, "quick"],
  ["5010-1177", "San Antonio", "sanantonio", "Redbird Ranch", "D.R. Horton", "Kingston II", 365000, 4, 2.5, 2280, 29.3945, -98.7412, "quick"],
  ["5011-6622", "New Berlin", "sanantonio", "River Bend", "Gehan Homes", "Bowie", 399000, 4, 2.5, 2410, 29.4812, -98.1124, "tbb"],
  ["5012-9988", "San Antonio", "sanantonio", "Kallison Ranch", "Perry Homes", "Plan 2940", 549000, 4, 3.5, 2980, 29.4845, -98.7124, "quick"],
  ["5013-3344", "Schertz", "sanantonio", "Homestead", "Brightland Homes", "Sonoma", 459000, 4, 3, 2620, 29.6124, -98.2412, "ucs"],
  ["5014-7755", "Seguin", "sanantonio", "Arroyo Ranch", "Lennar", "Bellingham", 299900, 3, 2, 1720, 29.5741, -97.9812, "quick"],
  ["5015-8811", "San Antonio", "sanantonio", "Stillwater Ranch", "Chesmar Homes", "Plan 2190", 435000, 4, 2.5, 2460, 29.5214, -98.7012, "quick"],
  ["5016-2244", "Castroville", "sanantonio", "Alsatian Heights", "CastleRock Communities", "Brazos II", 379000, 3, 2, 2040, 29.3541, -98.8712, "quick"],

  // --- Hill Country (10 homes) ---
  ["6001-2214", "New Braunfels", "hillcountry", "Veramendi", "Highland Homes", "Plan 2102", 645000, 4, 3.5, 3020, 29.703, -98.1012, "quick"],
  ["6002-8845", "Fredericksburg", "hillcountry", "Grape Creek Estates", "Coventry Homes", "Plan 6310", 829000, 3, 3, 2860, 30.2752, -98.872, "tbb"],
  ["6003-4421", "Kerrville", "hillcountry", "Riverhills", "CastleRock Communities", "Guadalupe", 498900, 3, 2, 2210, 30.0474, -99.1403, "quick"],
  ["6004-1123", "Canyon Lake", "hillcountry", "Rancho el Vado", "Gehan Homes", "Canyon", 568000, 4, 3, 2745, 29.8661, -98.2651, "ucs"],
  ["6005-7733", "Wimberley", "hillcountry", "Woodcreek Reserve", "David Weekley Homes", "Timberline", 749000, 4, 3.5, 3180, 29.9982, -98.1245, "quick"],
  ["6006-9955", "New Braunfels", "hillcountry", "Meyer Ranch", "Perry Homes", "Plan 2680", 579000, 4, 3, 2890, 29.7412, -98.2412, "quick"],
  ["6007-3388", "Johnson City", "hillcountry", "Pedernales Crest", "Raby Custom Homes", "Hill Country I", 915000, 4, 4, 3720, 30.2741, -98.4124, "ucs"],
  ["6008-6611", "Spring Branch", "hillcountry", "Mystic Shores", "Coventry Homes", "Plan 7210", 799000, 4, 3.5, 3510, 29.9124, -98.3712, "quick"],
  ["6009-8822", "Comfort", "hillcountry", "Comfort Falls", "Highland Homes", "Plan 2010", 685000, 4, 3, 2940, 29.9612, -98.9124, "tbb"],
  ["6010-4499", "Blanco", "hillcountry", "Rockin J Ranch", "Chesmar Homes", "Plan 2340", 475000, 3, 2.5, 2380, 30.0612, -98.4214, "quick"],

  // --- East Texas (8 homes) ---
  ["7001-2231", "Tyler", "easttx", "Hollytree", "Raby Custom Homes", "Rosewood II", 465000, 4, 3, 2760, 32.3015, -95.2985, "quick"],
  ["7002-8890", "Longview", "easttx", "Pine Tree Ranch", "CastleRock Communities", "Pineywoods", 389900, 3, 2, 1980, 32.5007, -94.7405, "quick"],
  ["7003-4402", "Lindale", "easttx", "Willow Creek Ranch", "Gehan Homes", "Lindale", 429000, 4, 3, 2480, 32.5163, -95.4093, "ucs"],
  ["7004-1188", "Bullard", "easttx", "Emerald Bay Estates", "Perry Homes", "Plan 2490", 495000, 4, 3, 2610, 32.1412, -95.3124, "quick"],
  ["7005-7766", "Tyler", "easttx", "The Crossing", "Highland Homes", "Plan 1850", 529000, 4, 3, 2710, 32.2741, -95.3412, "quick"],
  ["7006-9933", "Whitehouse", "easttx", "Lake Tyler Woods", "CastleRock Communities", "Sabine", 379000, 3, 2, 2040, 32.2214, -95.2145, "quick"],
  ["7007-3311", "Longview", "easttx", "Spring Hill North", "D.R. Horton", "Cali", 345000, 4, 2, 1980, 32.5412, -94.7812, "tbb"],
  ["7008-8844", "Kilgore", "easttx", "Meadowview Estates", "Lennar", "Travis", 325000, 3, 2, 1810, 32.3812, -94.8712, "quick"],

  // --- Coastal Bend (8 homes) ---
  ["8001-2214", "Corpus Christi", "gulf", "Sunrise Bay", "Chesmar Homes", "Plan 2210", 389900, 3, 2, 2010, 27.7421, -97.4019, "quick"],
  ["8002-8894", "Portland", "gulf", "Sunset Ridge", "D.R. Horton", "Corpus", 359900, 4, 2.5, 2210, 27.8769, -97.3258, "quick"],
  ["8003-4402", "Rockport", "gulf", "Bay Breeze Cottages", "Coventry Homes", "Plan 6204", 512000, 3, 2, 1950, 28.0206, -97.0538, "tbb"],
  ["8004-1199", "Port Aransas", "gulf", "Cinnamon Shore South", "Toll Brothers", "Seaside", 985000, 4, 4, 3120, 27.8245, -97.0612, "ucs"],
  ["8005-7744", "Corpus Christi", "gulf", "Terra Mar", "Lennar", "Palmetto", 345000, 3, 2, 1850, 27.6712, -97.3512, "quick"],
  ["8006-9922", "Aransas Pass", "gulf", "Harbor Point", "CastleRock Communities", "Laguna", 329000, 3, 2, 1780, 27.9124, -97.1412, "quick"],
  ["8007-3388", "Portland", "gulf", "Northshore Heights", "D.R. Horton", "Lakeside", 379000, 4, 2.5, 2340, 27.8912, -97.3012, "quick"],
  ["8008-6677", "Ingleside", "gulf", "Coastal Winds", "KB Home", "Plan 1940", 319000, 3, 2, 1820, 27.8712, -97.2145, "quick"],

  // --- Rio Grande Valley (8 homes) ---
  ["9001-2231", "McAllen", "valley", "Palmview Ranch", "Lennar", "Valley", 329900, 3, 2, 1850, 26.2034, -98.23, "quick"],
  ["9002-8894", "Edinburg", "valley", "Las Colinas", "CastleRock Communities", "Rio", 309900, 4, 2.5, 2050, 26.3017, -98.1633, "quick"],
  ["9003-4402", "Brownsville", "valley", "Rancho Viejo", "KB Home", "Palms", 289900, 3, 2, 1720, 25.9018, -97.4969, "ucs"],
  ["9004-1188", "Mission", "valley", "Sharyland Plantation", "D.R. Horton", "Citrus", 349000, 4, 2.5, 2190, 26.2145, -98.3214, "quick"],
  ["9005-7733", "Harlingen", "valley", "Treasure Hills", "Perry Homes", "Plan 2140", 365000, 4, 2.5, 2280, 26.1845, -97.6912, "quick"],
  ["9006-9944", "Weslaco", "valley", "Mid-Valley Estates", "CastleRock Communities", "Matagorda", 295000, 3, 2, 1790, 26.1612, -97.9845, "quick"],
  ["9007-3366", "McAllen", "valley", "Tres Lagos", "Lennar", "Santa Fe", 375000, 4, 3, 2410, 26.2845, -98.2612, "ucs"],
  ["9008-8811", "Edinburg", "valley", "Cimarron Country Club", "Gehan Homes", "Hidalgo", 339000, 3, 2.5, 2110, 26.3412, -98.1912, "quick"],

  // --- Permian Basin (6 homes) ---
  ["1050-2231", "Midland", "permian", "Grassland Estates", "Betenbough Homes", "Permian", 379900, 4, 2.5, 2150, 32.0105, -102.0892, "quick"],
  ["1051-8894", "Odessa", "permian", "Emerald Bay", "Betenbough Homes", "Caprock", 329900, 3, 2, 1890, 31.8457, -102.3676, "quick"],
  ["1052-4411", "Midland", "permian", "Mockingbird Ridge", "D.R. Horton", "Llano", 415000, 4, 3, 2480, 32.0412, -102.1412, "quick"],
  ["1053-1177", "Odessa", "permian", "Parks Bell Ranch", "Lennar", "Midland", 365000, 4, 2.5, 2210, 31.9124, -102.2945, "ucs"],
  ["1054-7722", "Midland", "permian", "Green Tree North", "Betenbough Homes", "Sterling", 449000, 4, 3, 2690, 32.0645, -102.1214, "quick"],
  ["1055-9988", "Andrews", "permian", "Mustang Creek", "Betenbough Homes", "Pecos", 319000, 3, 2, 1820, 32.3214, -102.5412, "tbb"],

  // --- El Paso (6 homes) ---
  ["1101-2214", "El Paso", "elpaso", "Painted Sky", "D.R. Horton", "Franklin", 359900, 4, 2.5, 2240, 31.8301, -106.5345, "quick"],
  ["1102-8894", "Horizon City", "elpaso", "Tuscany Hills", "KB Home", "Desert Bloom", 319900, 3, 2, 1910, 31.6801, -106.1531, "ucs"],
  ["1103-4422", "El Paso", "elpaso", "Cielo Vista West", "D.R. Horton", "Paso Del Norte", 389000, 4, 3, 2520, 31.8845, -106.4912, "quick"],
  ["1104-1166", "Socorro", "elpaso", "Mission Valley Ridge", "KB Home", "Rio Bravo", 299900, 3, 2, 1780, 31.6512, -106.2845, "quick"],
  ["1105-7799", "El Paso", "elpaso", "Pebble Hills East", "D.R. Horton", "Chihuahua", 345000, 4, 2.5, 2180, 31.7812, -106.2645, "quick"],
  ["1106-9933", "El Paso", "elpaso", "Resler Canyon", "Perry Homes", "Franklin Peak", 469000, 4, 3, 2750, 31.8412, -106.5612, "ucs"],
];

const SCHOOL_POOL = [
  { el: "Light Farms Elementary", mid: "Reynolds Middle", high: "Prosper High" },
  { el: "Katy Elementary", mid: "Beckendorff Jr High", high: "Seven Lakes High" },
  { el: "Wolf Ranch Elementary", mid: "James Ray Tays Jr High", high: "East View High" },
  { el: "Cibolo Green Elementary", mid: "Bulverde Middle", high: "Reagan High" },
  { el: "Founders Classical", mid: "Cornerstone Middle", high: "Legacy High" },
  { el: "Bridgeland High feeder", mid: "Smith Middle", high: "Bridgeland High" },
  { el: "Lake Travis Elementary", mid: "Hudson Bend Middle", high: "Lake Travis High" },
  { el: "Boerne Champion feeder", mid: "Boerne Middle South", high: "Champion High" },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const HIGHLIGHTS = [
  "Covered patio + outdoor kitchen rough-in",
  "Gourmet kitchen with gas range & quartz countertops",
  "Primary suite downstairs with luxury spa bath",
  "3-car tandem garage with epoxy-coated floors",
  "Greenbelt backing with zero rear neighbors",
  "Smart-home package with integrated sprinkler drip",
  "Energy Star certified with high-performance low-E glass",
  "Private study / home office with French doors",
  "Oversized corner lot with upgraded stone elevation",
  "Wireless motorized shade package + custom built-ins",
  "Designer ceramic tile across all wet & living areas",
  "Second-floor game room + dedicated cinema media bundle",
  "Spray foam insulation package for ultra-low utility bills",
  "Tankless gas water heater + whole-home water loop",
];

export const LISTINGS: Listing[] = ROWS.map((r, i) => {
  const [mls, city, regionId, community, builder, plan, price, beds, baths, sqft, lat, lng, status] = r;
  const b = BUILDERS.find((x) => x.name === builder);
  const rebatePct = b?.rebatePct ?? 2.5;
  const hs = SCHOOL_POOL[i % SCHOOL_POOL.length];
  return {
    mls,
    city,
    regionId,
    community,
    builder,
    plan,
    price,
    beds,
    baths,
    sqft,
    lat,
    lng,
    status,
    dom: ((i * 7) % 58) + 3,
    garage: beds > 3 ? 3 : 2,
    hoa: ((i * 13) % 9) * 12 + 36,
    lot: ["60 x 120", "72 x 130", "1/3 acre", "55 x 115", "80 x 140", "1/2 acre", "65 x 125"][i % 7],
    rebate: Math.round((price * rebatePct) / 10) * 10,
    rebatePct,
    pricePerSqft: Math.round(price / sqft),
    slug: `${slugify(city)}-${slugify(community)}-${slugify(mls)}`,
    images: [
      pick(IMG.ext, i, 1100, 780),
      pick(IMG.int, i + 2, 1100, 780),
      pick(IMG.int, i + 5, 1100, 780),
      pick(IMG.air, i + 1, 1100, 780),
    ],
    highlights: [
      HIGHLIGHTS[i % HIGHLIGHTS.length],
      HIGHLIGHTS[(i + 4) % HIGHLIGHTS.length],
      HIGHLIGHTS[(i + 8) % HIGHLIGHTS.length],
    ],
    schools: hs,
  };
});

export const regionById = (id: string) => REGIONS.find((r) => r.id === id);
export const listingBySlug = (slug: string) => LISTINGS.find((l) => l.slug === slug);

export type Filters = {
  minPrice: number;
  maxPrice: number;
  beds: number;
  minSqft: number;
  regions: string[];
  builders: string[];
  statuses: Status[];
  sort: "new" | "price-asc" | "price-desc" | "sqft-desc";
  q: string;
};

export const PRICE_MIN = 250000;
export const PRICE_MAX = 1000000;

export function filterListings(list: Listing[], f: Filters) {
  const q = f.q.trim().toLowerCase();
  const out = list.filter((l) => {
    if (l.price < f.minPrice || l.price > f.maxPrice) return false;
    if (l.beds < f.beds) return false;
    if (l.sqft < f.minSqft) return false;
    if (f.regions.length && !f.regions.includes(l.regionId)) return false;
    if (f.builders.length && !f.builders.includes(l.builder)) return false;
    if (f.statuses.length && !f.statuses.includes(l.status)) return false;
    if (q && !`${l.city} ${l.community} ${l.builder} ${l.plan}`.toLowerCase().includes(q)) return false;
    return true;
  });
  const sorted = [...out];
  if (f.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (f.sort === "sqft-desc") sorted.sort((a, b) => b.sqft - a.sqft);
  if (f.sort === "new") sorted.sort((a, b) => a.dom - b.dom);
  return sorted;
}

export const STATUS_META: Record<Status, { label: string; className: string }> = {
  quick: { label: "Quick Move-In", className: "bg-mint-500/15 text-mint-600 ring-mint-500/30" },
  ucs: { label: "Under Construction", className: "bg-gold-400/20 text-gold-700 ring-gold-400/40" },
  tbb: { label: "To-Be-Built", className: "bg-ink-900/10 text-ink-700 ring-ink-900/15" },
};

/* ------------------------------------------------------------------ *
 *  Communities
 * ------------------------------------------------------------------ */

export type Community = {
  name: string;
  city: string;
  regionId: string;
  builders: string[];
  priceFrom: number;
  sqftFrom: number;
  homes: number;
  amenities: string[];
  image: string;
  lat: number;
  lng: number;
  note: string;
};

export const COMMUNITIES: Community[] = [
  { name: "Mustang Lakes", city: "Celina", regionId: "dfw", builders: ["Highland Homes", "Perry Homes"], priceFrom: 610000, sqftFrom: 2800, homes: 1400, amenities: ["Crystal lagoon", "Resort pool", "18 mi trails", "Clubhouse", "Tennis courts"], image: pick(IMG.air, 0, 1000, 700), lat: 33.3245, lng: -96.7999, note: "Lagoon amenity center in the heart of Collin County growth." },
  { name: "Fields – Falcon Ranch", city: "Frisco", regionId: "dfw", builders: ["David Weekley Homes", "Tri Pointe Homes", "Toll Brothers"], priceFrom: 780000, sqftFrom: 3200, homes: 3200, amenities: ["PGA Frisco adjacent", "Pickleball", "Innovation STEM", "Championship golf"], image: pick(IMG.air, 2, 1000, 700), lat: 33.1941, lng: -96.3947, note: "Frisco's flagship 2,500-acre master plan." },
  { name: "Light Farms", city: "Prosper", regionId: "dfw", builders: ["Perry Homes", "Highland Homes"], priceFrom: 700000, sqftFrom: 3000, homes: 1900, amenities: ["Farm-to-market", "Barn events", "Lake beach", "5 resort pools"], image: pick(IMG.air, 3, 1000, 700), lat: 33.2362, lng: -96.7919, note: "1,070 acres of parks and trails in Prosper ISD." },
  { name: "Cross Creek Ranch", city: "Katy", regionId: "houston", builders: ["Perry Homes", "Lennar", "Highland Homes"], priceFrom: 540000, sqftFrom: 2600, homes: 3200, amenities: ["Aromatic garden", "Kayak lake", "Water park", "Dog park"], image: pick(IMG.air, 5, 1000, 700), lat: 29.7945, lng: -95.9219, note: "Katy's most amenitized master-planned community." },
  { name: "Bridgeland", city: "Cypress", regionId: "houston", builders: ["D.R. Horton", "Meritage Homes", "David Weekley Homes"], priceFrom: 470000, sqftFrom: 2400, homes: 6500, amenities: ["Creek trails", "Community gardens", "Fishing piers", "Kayak launches"], image: pick(IMG.air, 7, 1000, 700), lat: 30.0104, lng: -95.6945, note: "11,500-acre Howard Hughes development." },
  { name: "Jordan Ranch", city: "Fulshear", regionId: "houston", builders: ["Highland Homes", "Chesmar Homes", "Lennar"], priceFrom: 620000, sqftFrom: 2900, homes: 1400, amenities: ["The Shed", "Resort pool", "Fitness barn", "Lazy river"], image: pick(IMG.air, 4, 1000, 700), lat: 29.6923, lng: -95.8967, note: "Live-work-play village in fast-growing Fulshear." },
  { name: "Santa Rita Ranch", city: "Liberty Hill", regionId: "austin", builders: ["Perry Homes", "Highland Homes", "Brightland Homes"], priceFrom: 590000, sqftFrom: 2800, homes: 4000, amenities: ["The Homestead", "Lazy river", "Ag worker program", "Waterslides"], image: pick(IMG.air, 6, 1000, 700), lat: 30.6635, lng: -97.8943, note: "Hill Country ranch living with award-winning amenities." },
  { name: "Wolf Ranch", city: "Georgetown", regionId: "austin", builders: ["Gehan Homes", "Lennar", "David Weekley Homes"], priceFrom: 500000, sqftFrom: 2400, homes: 2200, amenities: ["Wolf Ranch Mall", "Lake trail", "Event lawn", "Infinity pool"], image: pick(IMG.air, 1, 1000, 700), lat: 30.6333, lng: -97.677, note: "Adjacent to 400 acres of shopping and parkland." },
  { name: "Travisso", city: "Leander", regionId: "austin", builders: ["Coventry Homes", "Toll Brothers"], priceFrom: 670000, sqftFrom: 3000, homes: 1400, amenities: ["Tuscany-inspired", "Cliffside views", "Tennis complex", "Palazzo clubhouse"], image: pick(IMG.ext, 5, 1000, 700), lat: 30.5659, lng: -97.8925, note: "Hill Country views minutes from the MetroRail." },
  { name: "Veramendi", city: "New Braunfels", regionId: "hillcountry", builders: ["Highland Homes", "David Weekley Homes"], priceFrom: 620000, sqftFrom: 2700, homes: 2500, amenities: ["Springs park", "River access", "Event center", "Community garden"], image: pick(IMG.ext, 7, 1000, 700), lat: 29.703, lng: -98.1012, note: "2,000-acre Hill Country plan between Austin & San Antonio." },
  { name: "Windmill Farms", city: "Cibolo", regionId: "sanantonio", builders: ["D.R. Horton", "Chesmar Homes"], priceFrom: 395000, sqftFrom: 2100, homes: 1600, amenities: ["Amenity centers", "Splash pad", "Disc golf", "Soccer fields"], image: pick(IMG.ext, 4, 1000, 700), lat: 29.5613, lng: -98.2269, note: "Best value per square foot in the San Antonio metro." },
  { name: "Sunrise Bay", city: "Corpus Christi", regionId: "gulf", builders: ["Chesmar Homes", "D.R. Horton"], priceFrom: 360000, sqftFrom: 1900, homes: 700, amenities: ["Bay views", "Boat ramps", "Fishing pier", "Windstorm rated"], image: pick(IMG.ext, 8, 1000, 700), lat: 27.7421, lng: -97.4019, note: "Coastal Bend living with windstorm-rated construction." },
  { name: "Palmview Ranch", city: "McAllen", regionId: "valley", builders: ["Lennar", "CastleRock Communities"], priceFrom: 310000, sqftFrom: 1700, homes: 900, amenities: ["Tropical landscaping", "Pool", "Playgrounds", "Gated entries"], image: pick(IMG.ext, 2, 1000, 700), lat: 26.2034, lng: -98.23, note: "Lowest new-construction entry pricing in Texas." },
  { name: "Grassland Estates", city: "Midland", regionId: "permian", builders: ["Betenbough Homes"], priceFrom: 350000, sqftFrom: 1900, homes: 600, amenities: ["Nearest-to-everything", "Sprinkler systems", "Fenced yards"], image: pick(IMG.build, 1, 1000, 700), lat: 32.0105, lng: -102.0892, note: "Move-in ready homes for Permian Basin relocations." },
  { name: "Painted Sky", city: "El Paso", regionId: "elpaso", builders: ["D.R. Horton", "KB Home"], priceFrom: 330000, sqftFrom: 2000, homes: 1100, amenities: ["Franklin Mtn views", "Trails", "Community center", "Low HOA"], image: pick(IMG.city, 6, 1000, 700), lat: 31.8301, lng: -106.5345, note: "Mountain views with the state's lowest HOA dues." },
];

/* ------------------------------------------------------------------ *
 *  Blog (14 in-depth articles)
 * ------------------------------------------------------------------ */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: number;
  author: string;
  image: string;
  tags: string[];
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "how-builder-rebates-work-in-texas",
    title: "How Builder Rebates Actually Work in Texas (2026 Guide)",
    excerpt:
      "Builder rebates are legal in Texas — but the paperwork, lender rules and timeline matter. Here's the full playbook from contract to cash.",
    category: "Rebates",
    date: "2026-02-18",
    read: 8,
    author: "Jordan Whitfield",
    image: pick(IMG.life, 0, 1100, 720),
    tags: ["rebate", "new construction", "closing costs", "texas law"],
    body: [
      "Texas has no restriction on builder incentives paid to buyers, which is why cash-back rebates have become the single most effective way to reduce the real cost of a new construction home. A rebate is a portion of the commission the builder pays to your licensed buyer's agent — and when you work with a rebate-based brokerage, a large share of that commission is returned to you at closing.",
      "The mechanics are simple. The builder markets a home at full retail price and budgets a 3% co-op commission for the buyer's agent who brings the buyer. If you walk into the sales center without representation, that budgeted amount stays with the builder. Register with a rebate brokerage first, and 2%–3% of your purchase price becomes your money at closing.",
      "Timing is the number one mistake buyers make. Registration must happen before your first visit, or at minimum before you sign a builder's visitor log. Most builders require your agent to accompany you or pre-register you electronically. Registering after that first handshake can forfeit the rebate entirely.",
      "Rebate money is typically applied to closing costs, prepaid escrow items, or a rate buydown — or issued as a credit on the settlement statement (Line 506 / 206). Some lenders cap how the funds can be used, so we route the credit through your lender early to avoid last-minute surprises.",
      "Finally, know your leverage. Builders would rather hold the line on price than lose a contract, so incentives, design-studio credits and rate buydowns move far more than base price. A rebate brokerage negotiates those levers for you, then stacks the rebate on top — which is how our buyers routinely save $12,000 to $25,000 on the same plan."
    ]
  },
  {
    slug: "dfw-vs-austin-new-construction",
    title: "DFW vs. Austin: Where New Construction Dollars Go Further in 2026",
    excerpt:
      "We compared 1,900 new-construction listings across both metros on price per square foot, incentives and days-to-close. The gap is bigger than you'd expect.",
    category: "Market Reports",
    date: "2026-02-04",
    read: 6,
    author: "Priya Raghavan",
    image: pick(IMG.air, 2, 1100, 720),
    tags: ["dfw", "austin", "market data", "metro comparison"],
    body: [
      "Price per square foot remains the cleanest comparison across metros. In our sample, DFW averaged $214/sqft in northern Collin County while the Austin metro averaged $248/sqft, with premium Hill Country communities clearing $300/sqft.",
      "Incentive depth tells the opposite story. Austin builders are carrying the heaviest incentive load in the state — average concessions of 4.2% of purchase price versus 2.9% in DFW — because inventory months-of-supply remains higher around Georgetown, Leander and Manor.",
      "Days to close favor DFW spec inventory: 41 days average from contract to key handoff, versus 58 days in Austin where more homes are sold to-be-built.",
      "The practical takeaway: if you want the deepest discount on a ready home, Austin's northern corridor is where builders are motivated. If you want the most square footage for the dollar in a top-rated school district, north DFW still leads."
    ]
  },
  {
    slug: "rate-buydown-vs-price-cut",
    title: "Rate Buydown vs. Price Cut: Which Builder Incentive Wins?",
    excerpt: "A 5/2/1 buydown can look better than a $40K price reduction. We ran the 30-year math on three real builder offers.",
    category: "Financing",
    date: "2026-01-22",
    read: 7,
    author: "Marcus Delgado",
    image: pick(IMG.build, 0, 1100, 720),
    tags: ["mortgage", "incentives", "calculator", "interest rates"],
    body: [
      "Builders love buydowns because they cost less than a price cut and show up as a headline interest rate. On a $500,000 loan at 6.75%, a permanent buydown to 5.25% costs the builder roughly $42,000 in discount points — comparable to a mid-size price reduction, but it changes your monthly payment immediately.",
      "Run the numbers against your hold period. A 2/1 temporary buydown is ideal if you expect to refinance within two years. A permanent buydown wins if you plan to stay five or more years. A price cut wins if you're putting 20% down and want a smaller loan balance from day one.",
      "The best outcome is usually a hybrid: negotiate a modest price reduction, take the builder's rate program, then apply your rebate to closing costs so you bring almost nothing to the table."
    ]
  },
  {
    slug: "10-questions-new-construction-tour",
    title: "10 Questions to Ask on Every New Construction Tour",
    excerpt: "The sales rep works for the builder. Bring this checklist so nothing important gets glossed over.",
    category: "Buyer Guides",
    date: "2026-01-09",
    read: 5,
    author: "Jordan Whitfield",
    image: pick(IMG.build, 4, 1100, 720),
    tags: ["checklist", "tours", "negotiation", "questions"],
    body: [
      "What is the total monthly incentive cost if I use my own lender, and what rate do you require to unlock the full package?",
      "Which structural options are included versus extra, and can any be rolled into the loan at appraisal?",
      "What is the current build timeline, and what penalty or compensation applies if it slips more than 60 days?",
      "Who holds my earnest money, and under what conditions is it refundable during the option period?",
      "What does the warranty cover in year one, year two and year ten — and what are the three most common claims you see?",
      "Are there upcoming phase releases with better lots at the same price?",
      "Can I see the HOA's current dues, transfer fee and any planned special assessments?",
      "What school attendance zones apply, and are boundary changes proposed in the next bond cycle?",
      "Which energy features are standard, and what is the projected average utility bill?",
      "Will you honor your current incentive package if I close in the next phase?"
    ]
  },
  {
    slug: "property-tax-homestead-texas",
    title: "Texas Property Taxes: The Homestead Filing Most New Buyers Miss",
    excerpt: "New construction assessments lag your purchase price by up to a year. Here's how to file and avoid a January shock.",
    category: "Ownership",
    date: "2025-12-15",
    read: 6,
    author: "Priya Raghavan",
    image: pick(IMG.life, 4, 1100, 720),
    tags: ["taxes", "homestead", "escrow", "savings"],
    body: [
      "New construction is often assessed on land value only during your first tax year, which means your escrow payment in year one dramatically understates reality. Budget on the full improved value, not the assessed value.",
      "File your general residence homestead exemption as soon as you occupy the home — there is no waiting period in Texas, and filing is free. Watch out for third-party mailers charging $50 to $150 to file a form that costs nothing.",
      "If you're over 65, disabled, or a disabled veteran, additional exemptions can meaningfully reduce the bill. Veterans with a 100% rating may qualify for a full exemption on the residence homestead."
    ]
  },
  {
    slug: "ai-home-search-tools",
    title: "How AI Search Cut Our Buyers' Home Tour Count in Half",
    excerpt: "Inside the recommendation engine we use to surface the right builder plans — and the data points that actually predict a good buy.",
    category: "Technology",
    date: "2025-11-30",
    read: 5,
    author: "Marcus Delgado",
    image: pick(IMG.int, 2, 1100, 720),
    tags: ["technology", "search", "ai", "machine learning"],
    body: [
      "Most buyers tour 14 to 20 homes before writing a contract. Our AI-assisted shortlisting brings that average to 7 by scoring each listing against a buyer's stated priorities — commute, school ratings, square footage efficiency, and lot orientation.",
      "The model weights three signals buyers consistently undervalue: days-on-market relative to community absorption, incentive depth as a percent of price, and price-per-square-foot spread against the same builder's neighboring phase.",
      "The result is fewer weekend drives and faster contracts. Our buyers averaged 27 days from first search to executed contract last quarter, compared with a 52-day market average."
    ]
  },
  {
    slug: "irs-rules-on-real-estate-rebates",
    title: "Is a Home Buyer Rebate Taxable? The Official IRS Ruling",
    excerpt: "IRS Revenue Ruling 2007-21 made it crystal clear: buyer rebates are non-taxable reductions in purchase price. Here's how to report it properly.",
    category: "Rebates",
    date: "2025-11-14",
    read: 7,
    author: "Jordan Whitfield",
    image: pick(IMG.life, 2, 1100, 720),
    tags: ["taxes", "irs", "rebate legality", "accounting"],
    body: [
      "One of the first questions prudent homebuyers ask is: 'Will I receive a 1099-MISC for my $15,000 rebate check at closing?' The answer under federal tax law is unequivocally no.",
      "Under IRS Revenue Ruling 2007-21 and subsequent letter rulings, a cash rebate or closing cost credit received by a homebuyer from a real estate broker represents an adjustment to the purchase price of the home, not gross taxable income.",
      "In tax accounting terms, the rebate lowers your cost basis in the property. If you purchase a home for $500,000 and receive a $15,000 rebate, your adjusted basis for future capital gains calculations becomes $485,000.",
      "Because primary residences qualify for up to $500,000 in tax-free capital gains for married couples ($250,000 for single filers) under Section 121, the vast majority of homeowners never pay tax on that adjusted basis either."
    ]
  },
  {
    slug: "4-milestone-inspections-new-construction",
    title: "Why You Need 4 Inspections Even on a Brand New Build",
    excerpt: "City code inspectors spend an average of 12 minutes on site. Here's why third-party milestone inspections saved our buyers $3.2M in defects.",
    category: "Buyer Guides",
    date: "2025-10-28",
    read: 8,
    author: "Elena Vasquez",
    image: pick(IMG.build, 1, 1100, 720),
    tags: ["inspections", "foundation", "pre-drywall", "warranty"],
    body: [
      "There is a pervasive myth among first-time new construction buyers that brand new homes don't require independent inspections because 'the city inspector signed off.'",
      "City inspectors check for basic minimum safety code compliance and typically inspect 15 to 25 homes per day, spending roughly 10 to 15 minutes per property. They do not check for cosmetic fitment, HVAC duct airflow balancing, insulation void pockets, or truss nailing patterns.",
      "We mandate four independent inspections for our clients: 1. Pre-pour foundation inspection (rebar placement and vapor barrier), 2. Pre-drywall mechanical inspection (framing, electrical rough-ins, plumbing stacks), 3. Final walkthrough inspection before key turnover, and 4. The 11-month warranty inspection before the builder's 1-year bumper-to-bumper expires.",
      "Across our last 400 closings, third-party inspectors flagged an average of 18 actionable defects per home, including crushed flex ductwork, unglued PVC vents in attics, and improperly flashed exterior penetrations that would have caused silent water damage years later."
    ]
  },
  {
    slug: "top-master-planned-communities-texas-2026",
    title: "The Top 7 Master-Planned Communities in Texas for 2026",
    excerpt: "From crystal lagoons in Celina to the PGA championship corridor in Frisco, these communities offer the highest resale appreciation.",
    category: "Market Reports",
    date: "2025-10-10",
    read: 6,
    author: "Priya Raghavan",
    image: pick(IMG.air, 5, 1100, 720),
    tags: ["master planned", "communities", "best neighborhoods", "lifestyle"],
    body: [
      "Master-planned communities in Texas have evolved beyond simple swimming pools and neighborhood parks. In 2026, lifestyle amenities directly drive property value retention and resale premiums.",
      "Topping our rankings this year is Mustang Lakes in Celina with its 20-acre central park and private lake, followed by Fields in Frisco, which sits adjacent to the PGA America headquarters and Omni Resort.",
      "In Greater Houston, Bridgeland and Cross Creek Ranch lead with interconnected waterways and dedicated nature preserves, while Austin's Santa Rita Ranch continues to win statewide awards for its agricultural community programming and resort waterparks.",
      "When buying into a master-planned community, we advise checking phase release schedules, future school bond maps, and the HOA's capital reserve funding ratio to ensure amenities stay pristine without surprise special assessments."
    ]
  },
  {
    slug: "spec-home-vs-to-be-built",
    title: "Spec Home vs. To-Be-Built: Which Option Gets You the Biggest Rebate?",
    excerpt: "Builders offer wildly different incentives depending on whether you take a quick move-in off their books or wait 9 months for a custom build.",
    category: "Financing",
    date: "2025-09-22",
    read: 6,
    author: "Marcus Delgado",
    image: pick(IMG.ext, 1, 1100, 720),
    tags: ["spec home", "quick move in", "negotiation", "discounts"],
    body: [
      "A spec home (short for speculative build or quick move-in) is a house the builder started without a buyer under contract. When a spec sits completed for more than 45 days, it costs the builder holding interest every single day.",
      "Because public builders must report closed homes to Wall Street every quarter, end-of-quarter and end-of-year spec homes carry the deepest price cuts, often reaching $30,000 to $60,000 below list price, plus maxed-out 3% rebates.",
      "To-be-built homes, by contrast, offer full customization of lot selection, structural extensions, and design studio finishes, but builders rarely discount base pricing because doing so devalues their community appraisals.",
      "If maximizing cash back and total discount is your top priority, a spec home closing in under 45 days is unbeatable. If having a 3-car garage, extended covered patio, and specific tile choices is essential, go to-be-built with our structural option credits."
    ]
  },
  {
    slug: "design-studio-upgrades-worth-the-money",
    title: "Which Design Studio Upgrades Are Worth It (And Which to Skip)",
    excerpt: "The design studio is where builders make their highest margins. Here's where to spend and where to do it after closing for 50% less.",
    category: "Buyer Guides",
    date: "2025-09-05",
    read: 7,
    author: "Elena Vasquez",
    image: pick(IMG.int, 0, 1100, 720),
    tags: ["design center", "upgrades", "appraisals", "budget"],
    body: [
      "The design center appointment can be the most exciting — and expensive — day of the new construction journey. Builders typically mark up cosmetic options by 80% to 200% over subcontracted costs.",
      "Always spend on structural and behind-the-wall items that cannot easily be added later: 8-foot interior doors, raised ceiling heights, extended covered patios, gas drops on the patio, plumbing rough-ins for future wet bars, and extra electrical circuits.",
      "Skip the high-markup decorative items that can be installed by third-party contractors for half the cost after closing: cabinet hardware, decorative pendant lights, ceiling fans, frameless shower glass, and secondary bedroom carpet upgrades.",
      "Flooring is a nuanced decision. If you upgrade to engineered hardwood or large-format tile through the builder, it is financed into your 30-year mortgage and covered under the builder's warranty, which is often worth the modest premium."
    ]
  },
  {
    slug: "understanding-mud-pid-pud-taxes-texas",
    title: "MUD vs. PID vs. PUD: Decoding Texas Property Tax Add-Ons",
    excerpt: "What is that extra 0.85% line item on your tax bill? How Municipal Utility Districts work and when the debt gets paid off.",
    category: "Ownership",
    date: "2025-08-19",
    read: 6,
    author: "Jordan Whitfield",
    image: pick(IMG.city, 0, 1100, 720),
    tags: ["mud taxes", "pid taxes", "texas property taxes", "escrow"],
    body: [
      "When shopping for new homes in Texas suburbs, you'll frequently notice effective tax rates ranging from 2.1% to over 3.4%. The major differentiator is the presence of a MUD (Municipal Utility District) or PID (Public Improvement District).",
      "A MUD is a political subdivision of the state authorized by the Texas Commission on Environmental Quality (TCEQ) to provide water, sewage, drainage, and other utility services to communities outside city limits where municipal infrastructure doesn't yet exist.",
      "The builder issues bonds to finance roads and water lines, and homeowners repay those bonds over 20 to 30 years via an ad-valorem tax on their property. As more homes are built in the community, the tax base expands and the MUD rate typically decreases.",
      "We calculate the full all-in monthly payment (Principal, Interest, County Tax, School ISD Tax, MUD/PID Tax, Insurance, and HOA dues) for every listing so you are never caught off-guard by a high utility district rate."
    ]
  },
  {
    slug: "closing-statement-hud1-rebate-line-item",
    title: "How Your Rebate Appears on the Closing Disclosure (Line-by-Line)",
    excerpt: "See exactly how Line 506 and Section L 'Credits' are formatted so your lender, title company and the IRS are completely aligned.",
    category: "Rebates",
    date: "2025-08-01",
    read: 5,
    author: "Marcus Delgado",
    image: pick(IMG.life, 3, 1100, 720),
    tags: ["closing disclosure", "settlement statement", "title company", "hud-1"],
    body: [
      "Transparency is the cornerstone of a legitimate broker rebate. On the Closing Disclosure (CD) prepared by your title escrow officer, the rebate appears clearly in Section L (Paid Already by or on Behalf of Borrower at Closing).",
      "It is explicitly identified as 'Broker Commission Credit to Buyer from Texas New Home Rebates' or entered on Line 506 / Line 206 of the standard HUD-1 format.",
      "Because the credit is submitted to the lender's underwriting department 2 weeks prior to closing, it reduces your required cash-to-close dollar-for-dollar without delaying funding.",
      "We coordinate directly with your title closer and loan officer to ensure the disbursement instructions are executed seamlessly before you sit down to sign final papers."
    ]
  },
  {
    slug: "veterans-and-first-responders-stackable-rebates",
    title: "VA Loans & Builder Concessions: Stacking Your Rebate with Military Benefits",
    excerpt: "Texas veterans and first responders can combine $0-down VA financing, up to 4% builder concessions, and our 3% brokerage rebate.",
    category: "Financing",
    date: "2025-07-15",
    read: 6,
    author: "Elena Vasquez",
    image: pick(IMG.life, 6, 1100, 720),
    tags: ["va loans", "veterans", "first responders", "concessions"],
    body: [
      "Texas is home to over 1.4 million veterans, and new construction builders offer some of the most generous hero incentive packages in the country.",
      "Under VA loan guidelines, a buyer can finance 100% of the purchase price with $0 down payment. Furthermore, the builder can contribute up to 4% of the loan amount toward seller concessions.",
      "When you add our 2.5% to 3% broker rebate to the transaction, it can be applied to pay down debt, cover all prepaid taxes and insurance, buy down your interest rate permanently, or refund your earnest money deposit at closing.",
      "Many of our veteran buyers have literally walked away from the closing table with a check in hand for their earnest money deposit while moving into a brand-new home with zero out-of-pocket costs."
    ]
  },
];

/* Display-name mapping to the Askins Realty Group team */
POSTS.forEach((p) => {
  if (p.author === "Jordan Whitfield") p.author = "Mike Askins";
  if (p.author === "Priya Raghavan") p.author = "Jenee Askins";
});

export const BLOG_CATEGORIES = ["All", "Rebates", "Market Reports", "Financing", "Buyer Guides", "Technology", "Ownership"];
