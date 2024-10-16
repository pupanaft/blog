


export default function fetchMiddleware(apiMethod, url, token, options){

  return fetch(`https://blog-platform.kata.academy/api/${url}`, {
    method: apiMethod,
    headers: {
      'Authorization':`Token ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options)
  })
}