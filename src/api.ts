// export class Api {
//   public apiUrl: string;

//   constructor(apiUrl: string) {
//     this.apiUrl = 'https://jsonplaceholder.typicode.com';
//   }
// }
// const api = new Api('https://jsonplaceholder.typicode.com');
// api.apiUrl;

export class Api {
  constructor(public apiUrl: string) {}
  getPosts() {
    return fetch(this.apiUrl);
  }
}
// const api = new Api('https://jsonplaceholder.typicode.com');
// api.apiUrl;
