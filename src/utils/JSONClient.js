const ER_API_URL = 'https://eldenring.fanapis.com/api/';
const queryParams = new URLSearchParams({
  limit: 5,
  page: 0,
});

async function queryJSONClient(url = '', category = 'items', params = {}) {
  const response = await fetch(`${url}${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: params,
  });

  try {
    return response.text();
  } catch (e) {
    console.error(e.message);
  }
}

(async function callAPITest() {
  const items = await queryJSONClient(ER_API_URL, 'items', queryParams);
  console.log(JSON.parse(items));
})();
