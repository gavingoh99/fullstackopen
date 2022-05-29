export async function request<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url);
  return response.json() as Promise<TResponse>;
  // return fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => data as TResponse);
}
