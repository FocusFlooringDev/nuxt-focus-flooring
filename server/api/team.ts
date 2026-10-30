import Airtable from 'airtable'

// Team members hidden from the site even if Airtable still marks them "live".
// Remove a name once their Airtable row is updated.
const hiddenNames = ['shane jones']

export default defineEventHandler(async () => {
	if (!process.env.AIRTABLE_TOKEN) {
		console.error('Missing AIRTABLE_TOKEN')
		return []
	}

	Airtable.configure({ apiKey: process.env.AIRTABLE_TOKEN })
	const base = Airtable.base('appX4S4Y72F1Ppq2Q')

	try {
		const records = await base('Table 1').select({ view: 'Grid view' }).all()

		const teamMembers = records
			.filter((r) => r.fields.status === 'live')
			.filter(
				(r) =>
					!hiddenNames.includes(
						`${String(r.get('firstName') ?? '').trim()} ${String(r.get('lastName') ?? '').trim()}`.toLowerCase()
					)
			)
			.map((r) => {
				const img = r.fields.image?.[0]?.url.replace(/^.{35}/, "");
				return {
				id: r.id,
				firstName: r.get('firstName') as string,
				lastName: r.fields.lastName as string,
				srcImg: img,
				title: r.fields.title as string,
				category: r.fields.category as string,
				bio: r.fields.bio as string,
				office: r.fields.office as string,
				mobile: r.fields.mobile as string,
				address: r.fields.address as string,
				email: r.fields.email as string,
				allowMessage: r.fields.allowMessage as boolean
			}})
		return teamMembers
	} catch (err) {
		console.error(err)
		return []
	}
})
