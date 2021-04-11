export interface ResponseTemplate {
  messageId?: string;
  data?: ResponseDataTemplate<Object>;
}
export interface ResponseDataTemplate<T> {
  data?: T;
}
