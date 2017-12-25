import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import * as bcrypt from 'bcryptjs';

interface Admin {
  id: string;
  password: string;
}

interface EventData {
  email: string;
  password: string;
}

const SALT_ROUNDS = 10;

export default async (event: FunctionEvent<EventData>) => {
  console.log(event);

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const { email, password } = event.data;

    // get admin by email
    const admin: Admin = await getAdminByEmail(api, email).then(r => r.Admin);

    // no admin with this email
    if (!admin) {
      return { error: 'Invalid credentials!' };
    }

    // check password
    const passwordIsCorrect = await bcrypt.compare(password, admin.password);
    if (!passwordIsCorrect) {
      return { error: 'Invalid credentials!' };
    }

    // generate node token for existing Admin node
    const token = await graphcool.generateNodeToken(admin.id, 'Admin');

    return { data: { id: admin.id, token } };
  } catch (e) {
    console.log(e);
    return { error: 'An unexpected error occured during authentication.' };
  }
};

async function getAdminByEmail(api: GraphQLClient, email: string): Promise<{ Admin }> {
  const query = `
    query getAdminByEmail($email: String!) {
      Admin(email: $email) {
        id
        password
      }
    }
  `;

  const variables = {
    email
  };

  return api.request<{ Admin }>(query, variables);
}
