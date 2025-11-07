import { RawServerDefault } from 'fastify';

import request from 'supertest';

export type GraphQLResponse<T> = { data?: T; errors?: any[] };

export async function gql<T>(
  server: RawServerDefault,
  query: string,
  variables?: Record<string, unknown>,
): Promise<{ status: number; body: GraphQLResponse<T> }> {
  const res = await request(server)
    .post('/graphql')
    .set('content-type', 'application/json')
    .send({ query, variables });

  return { status: res.status, body: res.body as GraphQLResponse<T> };
}
