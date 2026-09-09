import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

function upstreamHeaders() {
	const credentials = btoa(`${env.BESEDE_API_USER}:${env.BESEDE_API_PASSWORD}`);
	return {
		Authorization: `Basic ${credentials}`,
		'Content-Type': 'application/json',
	};
}

export const POST: APIRoute = async ({ request }) => {
	const body = await request.text();

	const upstream = await fetch(`${env.BESEDE_API_URL}/besede/generate_stream`, {
		method: 'POST',
		headers: upstreamHeaders(),
		body,
	});

	if (!upstream.ok || !upstream.body) {
		return new Response(
			JSON.stringify({ type: 'error', response: `Storitev ni na voljo (${upstream.status}).` }),
			{ status: 502, headers: { 'Content-Type': 'application/json' } },
		);
	}

	return new Response(upstream.body, {
		status: 200,
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	});
};
