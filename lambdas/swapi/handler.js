import { success, failure } from '../../util/responses';

const axios = require('axios');

export const main = async event => {
  const { SWAPI_BASE_URL } = process.env;
  const { customerSelection } = event.Details.Parameters;

  try {
    const {
      data: {
        results
      }
    } = await axios({
      url: `${SWAPI_BASE_URL}${customerSelection}`,
      method: 'get',
    });

    if(results.length === 0) throw new Error(`Could not locate any ${customerSelection} for that selection`);

    console.log(`Successful response: ${results}`);
    return success(results);
  } catch (error) {
    console.error(error);
    return failure({ error });
  }
};
