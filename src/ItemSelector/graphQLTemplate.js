async function queryGraphQL(query) {
  const response = await fetch('https://eldenring.fanapis.com/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'elden-ring-build-calculator/0.0.1',
    },
    body: {
      query,
    },
  });

  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Error parsing JSON', text);
  }
}
