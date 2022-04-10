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

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('#content');

  setTimeout((): void => {
    getApiResponse(postsUrl)
      .then(posts => {
        content.innerHTML = 'Select post&hellip;';

        for (const post of posts) {
          addListElement(post);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally((): void => {
        const loader = document.querySelector('#spinner');
        loader.remove();
      });
  }, 2000);
});
