export interface IUser {
  _id: string;
  id: string;
  email: string;
  image: string;
  name: string;
  role: string;
  posts: Array<Object>;
  username: string;
  createdAt: string;
  updatedAt: string;
}
