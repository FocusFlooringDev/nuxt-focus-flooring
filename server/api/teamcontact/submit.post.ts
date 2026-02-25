import Airtable from 'airtable'
import { TeamContactSchema } from '~/schemas/TeamContact'

export default defineEventHandler(async (event) => {
	if (!process.env.AIRTABLE_CONTACT) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Server misconfiguration: missing AIRTABLE_CONTACT'
		})
	}

	Airtable.configure({ apiKey: process.env.AIRTABLE_CONTACT })
	const base = Airtable.base('appA9gJqhlSOsEq6L')

	const result = await readValidatedBody(event, (body) =>
		TeamContactSchema.safeParse(body)
	)

	if (!result.success) {
		console.log(result.error)
		throw result.error.issues
	} else {
		try {
			const res = await base(result.data.formName).create({
				name: result.data.name,
				phone: result.data.phone,
				email: result.data.email,
				subject: result.data.subject,
				message: result.data.message,
				sendto: result.data.sendto
			})

			return {
				statusCode: 200,
				body: JSON.stringify(res)
			}
		} catch (err: any) {
			throw createError({
				statusCode: err?.statusCode || 500,
				statusMessage: err?.message || 'Failed to submit contact form'
			})
		}
	}
})
