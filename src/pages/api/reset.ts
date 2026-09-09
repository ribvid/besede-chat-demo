import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	const body = await request.text();

	const credentials = btoa(`${env.BESEDE_API_USER}:${env.BESEDE_API_PASSWORD}`);

	const upstream = await fetch(`${env.BESEDE_API_URL}/besede/reset_session`, {
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
