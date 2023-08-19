export interface IPost {
  text: string;
  author: {
    name: string;
    image: string;
    username: string;
  };
  like: [];
  comments: [];
  id: string;
}
