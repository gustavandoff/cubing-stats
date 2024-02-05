import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const csTimerId = url.searchParams.get('id');

    if (!csTimerId) {
        return error(400, 'No csTimer account id provided');
    }

	const res = await fetch('http://127.0.0.1:8000/cstimer-userdata', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id: csTimerId })
	});

    if (!res.ok) {
        return error(500, 'Failed to fetch data from csTimer');
    }

	const compressedData = await res.json();
    const data = compressedData.data;

	return new Response(data);
};
