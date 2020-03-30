import axiosbase from 'axios'

type apiFetcher = {
  apiURL: string,
  endPoint: string,
  idToken: string
}

const apiFetcher = async ({apiURL, endPoint, idToken}: apiFetcher) => {
	const headers = {
			'Content-Type': 'application/json',
      'authorization': 'Bearer ' + idToken,
	}
	const axios = axiosbase.create({
		baseURL: apiURL,
		headers: headers,
		responseType: 'json',
	})

  const result = await axios
      .get(endPoint)
      .then(res => res.data)
      .catch(error => error)

  return result
}


export const documentFetcher = async ({apiURL, idToken}) => {
  const endPoint = '/api/documents'
  const documents = await apiFetcher({apiURL, endPoint, idToken}).then(
    (data) => {
      console.log('data', data)
      return documentParser(data)
    }
  ).catch((e) => {
    console.log('error', e)
  })  // FIXME: here are gonna cause this error: Unhandled Rejection (TypeError): rawDocuments.map is not a function
  //const documents = documentParser(response)
  return documents
}


export const documentParser = (rawDocuments) => {
  const documents = rawDocuments.map((_document, _index) => {
    try {
      const parsedDocumentContent = JSON.parse(documentContentCleanser(_document['document_content']))
      console.log(parsedDocumentContent)
      return {
        ..._document,
        key: _document['id'],
        document_content: {
          ...parsedDocumentContent,
          key: _document['id']
        }
      }
    } catch (error) {
      console.log('errorrr', error)
      return
    }
  })
  return documents
}

const documentContentCleanser = (documentContent) => {
  const cleanedDocumentContent = documentContent
    .replace(/"/g, '')
    .replace(/'/g, '"')
    .replace('False', 'false')
    .replace('None', '""')
  console.log('cleaned', cleanedDocumentContent)
  return cleanedDocumentContent
}

export default apiFetcher
