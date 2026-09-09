import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const body = await request.text();

	const user = import.meta.env.BESEDE_API_USER;
	const password = import.meta.env.BESEDE_API_PASSWORD;
	const credentials = Buffer.from(`${user}:${password}`).toString('base64');

	const upstream = await fetch(`${import.meta.env.BESEDE_API_URL}/besede/reset_session`, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${credentials}`,
			'Content-Type': 'application/json',
		},
		body,
	});

	return new Response(await upstream.text(), {
		status: upstream.status,
		headers: { 'Content-Type': 'application/json' },
	});
};
