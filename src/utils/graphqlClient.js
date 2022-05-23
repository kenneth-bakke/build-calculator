function generateBadRequestError(responseBody, shouldLogError) {
  const badRequestError = new Error(
    'Error fetching data. Likely malformed query.'
  );
  badRequestError.graphqlErrors = responseBody?.errors;

  if (shouldLogError) {
    console.error(badRequestError);

    if (badRequestError.graphqlErrors) {
      console.error(badRequestError.graphqlErrors);
    }
  }

  return badRequestError;
}

function generateServerError(requestBody, shouldLogError) {
  const serverErrorError = new Error(
    '500 response received from GraphQL server. Check that your response body is correct.'
  );
  serverErrorError.requestBody = requestBody;

  if (shouldLogError) {
    console.error(serverErrorError, serverErrorError.requestBody);
  }

  return serverErrorError;
}

export async function queryGraphQL(query) {
  const body = JSON.stringify(`query: ${query}`);

  const response = await fetch('https://eldenring.fanapis.com/api/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Content-Type': 'application/json',
      'User-Agent': 'elden-ring-build-calculator/0.0.1',
    },
  });

  const text = await response.text();
  let parsedJsonResponse = {};

  try {
    parsedJsonResponse = JSON.parse(text);
  } catch (e) {
    console.error('Error parsing JSON', text);

    if (response.status === 400) {
      throw generateBadRequestError(parsedJsonResponse, true);
    }

    if (response.status === 500) {
      throw generateServerError(body, true);
    }
  }

  return parsedJsonResponse;
}
