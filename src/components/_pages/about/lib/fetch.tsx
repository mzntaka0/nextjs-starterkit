import { request } from 'graphql-request'


export const URL = 'http://localhost:3000/api/graphql'

// TODO: make query more flexible. Is the module just for query needed?
export const query = `
  {
    users {
      firstName,
    }
  }
  `


const fetcher = async (query) => {
  const res = await request(URL, query)
  return JSON.stringify(res)
}


export default fetcher
