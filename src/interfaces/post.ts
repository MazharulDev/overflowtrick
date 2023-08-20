export interface IPost {
  text: string;
  email: string;
  author: {
    email: string | null | undefined;
    name: string;
    image: string;
    username: string;
  };
  like: [];
  comments: [];
  id: string;
}
