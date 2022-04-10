import {Post} from './model/post';
import {Author} from './model/author';
import {Comment} from './model/comment';
// import {Api} from './api';

interface DataProvider {
  getPosts(): Promise<Post[]>;
  getAuthor(authorId: number): Promise<Author>;
  getComments(postId: number): Promise<Comment[]>;
}

class Api implements DataProvider {
  postsSuffix: string = 'posts';
  constructor(public readonly apiUrl: string) {}
  public getPosts(): Promise<Post[]> {
    return this.getApiResponse(this.getPostsUrl());
  }
  public getAuthor(authorId: number): Promise<Author> {
    const userUrl = `${this.apiUrl}/users/${authorId}`;
    return this.getApiResponse(userUrl);
  }
  public getComments(postId: number): Promise<Comment[]> {
    const postCommentsUrl = `${this.apiUrl}/comments?postId=${postId}`;
    return this.getApiResponse(postCommentsUrl);
  }
  // definicja metody
  public getPostsUrl(): string {
    return `${this.apiUrl}/${this.postsSuffix}`;
  }
  // async getApiResponse(url: string): Promise<any> {
  private async getApiResponse(url: string): Promise<any> {
    const postsRequest: Promise<Response> = fetch(url);
    const response: Response = await postsRequest;
    const json: any = response.json();
    return json;
  }
}

const api = new Api('https://jsonplaceholder.typicode.com');

const apiUrl: string = 'https://jsonplaceholder.typicode.com';
const postsUrl: string = `${apiUrl}/posts`;
// const commentsUrl: string = `${apiUrl}/comments`;
const usersUrl: string = `${apiUrl}/users`;

// async function setAuthor(authorId: number): void {
async function setAuthor(authorId: number) {
  //   const userUrl = `${usersUrl}/${authorId}`;
  //   const user: Author = await getApiResponse(userUrl);
  const user: Author = await api.getAuthor(authorId);
  const userElement = document.getElementById('author');
  userElement.classList.add('author');
  userElement.innerHTML = `<h3>${user.name} <small>(${user.email})</small></h3>`;
}

async function loadComments(postId: number) {
  //   const postCommentsUrl = `${commentsUrl}?postId=${postId}`;
  //   const comments: Comment[] = await getApiResponse(postCommentsUrl);
  const comments: Comment[] = await api.getComments(postId);
  const commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = '';
  for (const comment of comments) {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
        <h4><i>${comment.name}</i> by <code>${comment.email}</code></h4>
        <p>${comment.body}</p>
      `;
    commentsContainer.append(commentElement);
  }
}

async function addListElement(post: Post): Promise<void> {
  const element = document.createElement('li');
  element.innerText = `${post.id} ${post.title}`;
  element.classList.add('title');
  element.addEventListener('click', async () => {
    const contentElement = document.getElementById('content');
    contentElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
    setAuthor(post.userId);
    loadComments(post.id);
  });
  const listContainer = document.getElementById('list');
  listContainer.append(element);
}

// async function getApiResponse(url: string) {
//   const postsRequest: Promise<Response> = fetch(url);
//   const response: Response = await postsRequest;
//   const json: any = response.json();
//   // const json: any = response.json(); // jeśli nie wiemy jaki typ ma zwrócić
//   return json;
// }

document.addEventListener('DOMContentLoaded', (): void => {
  const content = document.querySelector('#content');

  setTimeout((): void => {
    // getApiResponse(postsUrl)
    api
      .getPosts()
      .then((posts: Post[]) => {
        content.innerHTML = 'Select post&hellip;';

        for (const post of posts) {
          addListElement(post);
        }
      })
      .finally((): void => {
        const loader = document.querySelector('#spinner');
        loader.remove();
      });
  }, 2000);
});
