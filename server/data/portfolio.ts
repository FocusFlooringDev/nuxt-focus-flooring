// Portfolio content kept in code instead of Airtable.
// Photos live in public/portfolio/<slug>/01.jpg, 02.jpg, ... (01 is the cover).

export type GalleryPhoto = { src: string; alt: string }

const photos = (slug: string, alts: string[]): GalleryPhoto[] =>
	alts.map((alt, i) => ({
		src: `/portfolio/${slug}/${String(i + 1).padStart(2, '0')}.jpg`,
		alt
	}))

// Projects that are not in Airtable. Sources: Jacques Duval's
// "Portfolio Additions" list (Nov 2026) and, for Sumner, the original
// T.T.T. High School flooring proposal.
export const codeProjects = [
	{
		id: 'code-moffitt-speros',
		slug: 'moffitt-speros',
		name: 'Moffitt Speros',
		client: 'Foresight Construction',
		scope: 'Tile, resilient flooring, carpet, base',
		category: 'Healthcare',
		gallery: photos('moffitt-speros', [
			'Lounge with wood-look flooring and floor-to-ceiling windows',
			'Open office with patterned grey carpet',
			'Corridor with light grey sheet flooring and an orange inlay band',
			'Carpet to green resilient flooring transition at a doorway',
			'Close-up of teal geometric patterned carpet'
		])
	},
	{
		id: 'code-baycare-carrollwood',
		slug: 'baycare-carrollwood',
		name: 'BayCare Carrollwood Health Hub',
		client: 'DeAngelis Diamond',
		scope: 'Tile, resilient flooring, carpet, base',
		category: 'Healthcare',
		gallery: photos('baycare-carrollwood', [
			'Reception area with light resilient flooring',
			'Exterior of the BayCare HealthHub Carrollwood',
			'Corridor with blue inset floor panels leading to a tiled feature wall',
			'Side corridor with blue inset floor panels',
			'Green glazed tile wall at a water fountain'
		])
	},
	{
		id: 'code-jule-f-sumner-high-school',
		slug: 'jule-f-sumner-high-school',
		name: 'Jule F. Sumner High School',
		client: 'CORE Construction',
		scope:
			'Porcelain, quarry and mosaic floor tile, ceramic wall tile, carpet tile, walk-off carpet, VCT, rubber base, tile waterproofing',
		category: 'Education',
		gallery: photos('jule-f-sumner-high-school', [
			'Library with colorful carpet',
			'School entrance and exterior',
			'Cafeteria with blue and white flooring',
			'Courtyard between classroom buildings'
		])
	},
	{
		id: 'code-usf-indoor-performance-facility',
		slug: 'usf-indoor-performance-facility',
		name: 'USF Indoor Performance Facility',
		client: 'RR Simmons',
		scope: 'Tile, carpet, base, resinous flooring',
		category: 'Education',
		gallery: photos('usf-indoor-performance-facility', [
			'Press room with grey carpet tile',
			'Indoor practice field',
			'Stairway with stair treads and a carpet tile landing',
			'Restroom with green wall tile',
			'Carpet tile to floor tile transition'
		])
	}
].map((p) => ({ ...p, srcImg: p.gallery[0].src, alt: p.gallery[0].alt }))

// Extra photos for projects that come from Airtable, matched by the
// project name exactly as it appears in Airtable.
export const airtableExtras: Record<
	string,
	{ slug: string; gallery: GalleryPhoto[] }
> = {
	'Tampa International Airport Main Terminal Curbside Expansion Blue Side & Central Utility Plant Building':
		{
			slug: 'tpa-mtc-blue-side-cip',
			gallery: photos('tpa-mtc-blue-side-cip', [
				'Elevator lobby with polished flooring and seating',
				'Curbside walkway outside the Blue 101 Express doors',
				'Long corridor with polished flooring',
				'Central utility plant with sealed concrete floor'
			])
		},
	'Heron Tampa at Waterstreet': {
		slug: 'heron-tampa-at-water-street',
		gallery: photos('heron-tampa-at-water-street', [
			'Apartment living area with wood-look flooring and city views',
			'Heron Tampa tower exterior',
			'Amenity lounge with light stone-look flooring',
			'Apartment living room and kitchen with wood-look flooring',
			'Lobby with polished concrete floor'
		])
	},
	'Cora at Waterstreet': {
		slug: 'cora-at-water-street',
		gallery: photos('cora-at-water-street', [
			'Apartment kitchen and dining area with wood-look flooring',
			'Model bedroom with wood-look flooring'
		])
	}
}

export const slugify = (name: string) =>
	name
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
