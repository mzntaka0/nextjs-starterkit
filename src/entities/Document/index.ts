export type Document = {
  id: string,
  name: string,
  document_type: string,
  document_content: DocumentContent,
  tenant: string,
  key: string
}

export type DocumentContent = {
  created_at: string,
  doc_object: DocObject[],
  tenant: string,
  image_path: string,
  document_path: string,
  key: string
}

export type DocObject = {
  name: string,
  instances: any[]
}
