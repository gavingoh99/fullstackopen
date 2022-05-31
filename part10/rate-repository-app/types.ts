export interface Repository {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
  url: string;
  key?: string;
}
interface RepositoryEdge {
  node: Repository;
  cursor: string;
}
interface PageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor: string;
  endCursor: string;
}
export interface FetchedRepositories {
  totalCount?: number;
  edges: RepositoryEdge[];
  pageInfo?: PageInfo;
}
export interface SignInFormValues {
  username: string;
  password: string;
}
interface User {
  id: string;
  username: string;
}
export interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: User;
  repositoryId: string;
  repository: Repository;
}
interface ReviewNode {
  node: Review;
}
interface Reviews {
  edges: ReviewNode[];
}
export interface FetchedRepository extends Repository {
  reviews: Reviews;
}
export interface ReviewFormValues {
  repositoryName: string;
  ownerName: string;
  rating: number | '';
  text?: string;
}
export interface SubmitFunctionObject {
  resetForm: (object: SignInFormValues | ReviewFormValues) => void;
  setSubmitting: (submit: boolean) => void;
  setFieldTouched: (field: string, _: boolean, __: boolean) => void;
}
export interface SignUpFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}
