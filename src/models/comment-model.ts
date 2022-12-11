export interface CommentModel {
  id: string;
  parent_id?: string;
  author: Author;
  text: string;
  timestamp: number;
}

interface Author {
  name: string;
  picture: string;
}