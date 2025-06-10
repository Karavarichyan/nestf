// export function getTokenFromLocalStorage():string{
// const data = localStorage.getItem('token')
// const token;String= data ? JSON.parse(data) : ''
// return token
// }
// export function getTokenFromLocalStorage(): string {
//   const data = localStorage.getItem('token')
//   try {
//     return data ? JSON.parse(data) : ''
//   } catch {
//     return ''
//   }
// }

// export function setTokenToLocalStorage(key: string,token:string): void
// {
//   localStorage.setItem(key,JSON.stringify(token))

// }

// export function remmuveTokenFromLocalStorage(key: String): void{
//   localStorage.removeItem(key)
// }

export function getTokenFromLocalStorage(): string {
  const data = localStorage.getItem('token')
  try {
    return data ? JSON.parse(data) : ''
  } catch {
    return ''
  }
}

export function setTokenToLocalStorage(key: string, token: string): void {
  localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromLocalStorage(key: string): void {
  localStorage.removeItem(key)
}
