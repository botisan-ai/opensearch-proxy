import fastify from 'fastify';
import fetch from 'node-fetch';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import aws4 from 'aws4';

const host = 'search-whisperserverse-ly7cuzks4cti-25v5p7hn7dn2j5zhjbj4jeawbe.us-west-2.es.amazonaws.com';
const region = 'us-west-2';
const service = 'es';

const app = fastify({ logger: true });
const provider = defaultProvider();

app.all('/*', async (request, reply) => {
  const credentials = await provider();
  const path = request.url;

  const opts = {
    host,
    path,
    region,
    service,
  };

  aws4.sign(opts, credentials);

  delete request.headers.host;
  delete request.headers.referer;

  const res = await fetch(`https://${host}${path}`, {
    method: request.method,
    headers: {
      ...request.headers,
      ...opts.headers,
    },
  });

  let body = '';

  if (res.headers.get('content-type') === 'application/json') {
    body = await res.json();
  } else {
    body = Buffer.from(await res.arrayBuffer());
  }

  for (const [key, value] of res.headers.entries()) {
    if (key === 'content-encoding') {
      continue;
    }
    reply.header(key, value);
  }

  reply.send(body);
});

app.listen({ port: 9200, host: '0.0.0.0' });