import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';

interface Admin {
  id: string;
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

    if (!validator.isEmail(email)) {
      return { error: 'Not a valid email' };
    }

    // check if user exists already
    const userExists: boolean = await getAdmin(api, email).then(r => r.Admin !== null);
    if (userExists) {
      return { error: 'Email already in use' };
    }

    // create password hash
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    // create new user
    const userId = await createGraphcoolAdmin(api, email, hash);

    // generate node token for new Admin node
    const token = await graphcool.generateNodeToken(userId, 'Admin');

    return { data: { id: userId, token } };
  } catch (e) {
    console.log(e);
    return { error: 'An unexpected error occured during signup.' };
  }
};

async function getAdmin(api: GraphQLClient, email: string): Promise<{ Admin }> {
  const query = `
    query getAdmin($email: String!) {
      Admin(email: $email) {
        id
      }
    }
  `;

  const variables = {
    email
  };

  return api.request<{ Admin }>(query, variables);
}

async function createGraphcoolAdmin(
  api: GraphQLClient,
  email: string,
  password: string
): Promise<string> {
  const mutation = `
    mutation createGraphcoolAdmin($email: String!, $password: String!) {
      createAdmin(
        email: $email,
        password: $password
      ) {
        id
      }
    }
  `;

  const variables = {
    email,
    password: password
  };

  return api.request<{ createAdmin: Admin }>(mutation, variables).then(r => r.createAdmin.id);
}
