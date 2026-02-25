import Airtable from 'airtable'

type AirtableError = {
	error: string
	message: string
	statusCode: number
}

export default defineFormActions({
	default: async (event) => {
		if (!process.env.AIRTABLE_FORM) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Server misconfiguration: missing AIRTABLE_FORM'
			})
		}

		Airtable.configure({ apiKey: process.env.AIRTABLE_FORM })
		const base = Airtable.base('appMDLS774dmy6UBH')

		const body = await readBody(event)

		try {
			await base('Sheet1').create([{ fields: body }])
			return {
				statusCode: 200,
				message: 'Success'
			}
		} catch (err: AirtableError | any) {
			throw createError({
				statusCode: err.statusCode,
				statusMessage: 'Something went wrong. Please try again.'
			})
		}
	}
})
