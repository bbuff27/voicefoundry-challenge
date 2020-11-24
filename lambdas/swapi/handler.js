import { success, failure } from '../../util/responses';

const axios = require('axios');

export const main = async event => {
  const { SWAPI_BASE_URL } = process.env;
  const { customerSelection, pageNumber } = event.Details.Parameters;
  const currentPage = (pageNumber ?? 0) + 1;

  try {
    const {
      data: {
        results
      }
    } = await axios({
      url: `${SWAPI_BASE_URL}${customerSelection}/?page=${currentPage}`,
      method: 'get',
    });

    if(results.length === 0) throw new Error(`Could not locate any ${customerSelection} for that selection`);

    const responseBody = {
      currentPage,
      optionsString: buildAttributeString(results),
      agentInfo: results,
    }

    console.log(`Successful response: ${results}`);
    return success(responseBody);
  } catch (error) {
    console.error(error);
    return failure({ error });
  }
};

const buildAttributeString = apiResponse => apiResponse.map(resource => resource.name).join(', ')
