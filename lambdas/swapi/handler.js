import axios from 'axios';
import { success, failure } from '../../util/responses';

export const main = async event => {
  const { SWAPI_BASE_URL } = process.env;
  const eventBody = JSON.parse(event.body);

  try {
    console.log(`Successful response: ${eventBody}`);
    return success(eventBody);
  } catch (error) {
    console.error(error);
    return failure({ error });
  }
};
