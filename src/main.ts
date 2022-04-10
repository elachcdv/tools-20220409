const apiUrl: string = 'https://jsonplaceholder.typicode.com';

const postsUrl: string = `${apiUrl}/posts`;
const commentsUrl: string = `${apiUrl}/comments`;
const usersUrl: string = `${apiUrl}/users`;

async function getApiResponse(url: string) {
  const postsRequest: Promise<Response> = fetch(url);
  const response: Response = await postsRequest;
  const json: Object = response.json();
  //   const json: any = response.json(); // jeśli nie wiemy jaki typ ma zwrócić
  return json;
}
