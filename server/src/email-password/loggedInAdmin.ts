import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';

interface Admin {
  id: string;
}

export default async (event: FunctionEvent<{}>) => {
  console.log(event);

  try {
    // no logged in admin
    if (!event.context.auth || !event.context.auth.nodeId) {
      return { data: null };
    }

    const adminId = event.context.auth.nodeId;
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    // get admin by id
    const admin: Admin = await getAdmin(api, adminId).then(r => r.Admin);

    // no logged in admin
    if (!admin || !admin.id) {
      return { data: null };
    }

    return { data: { id: admin.id } };
  } catch (e) {
    console.log(e);
    return { error: 'An unexpected error occured during authentication.' };
  }
};

async function getAdmin(api: GraphQLClient, id: string): Promise<{ Admin }> {
  const query = `
    query getAdmin($id: ID!) {
      Admin(id: $id) {
        id
      }
    }
  `;

  const variables = {
    id
  };

  return api.request<{ Admin }>(query, variables);
}
