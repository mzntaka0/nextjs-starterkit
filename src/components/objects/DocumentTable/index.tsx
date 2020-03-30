import React, {useState, useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Router, {useRouter} from 'next/router'
import {Button as AntButton} from 'antd'
import { Table, Input, Icon, Drawer as AntDrawer } from 'antd';
import Highlighter from 'react-highlight-words';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {CSVDownload} from 'react-csv'
import {CSVLink} from 'react-csv'
import moment from 'moment'

import DocumentModalContent from '../../sections/Contents/DocumentModalContent'
import ImagePreviewer from '../ImagePreviewer'
import {Document} from '../../../entities/Document'



//class MyTable extends React.Component<{dataSource: object[], columns: object[]}, {searchText: string, searchColumn: string}> {
// TODO: Need a huge refactoring
const MyTable: React.FC<{dataSource: Document[] | undefined}> = ({dataSource}) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState<string>('')
  const [searchedColumn, setSearchedColumn] = useState<string>('')
  const [searchInput, setSearchInput] = useState<Input | null | undefined>()
  const [searchedRecord, setSearchedRecord] = useState<Document[]>()
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [downloadButtonLoading, setDownloadButtonLoading] = useState()
  const documents = useSelector(state => state.documentReducer.documents)

  useEffect(() => {
    console.log('documents', documents)
  }, [documents])
  const dispatch = useDispatch()


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setCSVHeaders(headerInit)
      setSelectedRows(selectedRows)
      const exportHeaders = getHeadersSetList(headerCreator(selectedRows))
      console.log('exportHeaders', exportHeaders)
      setCSVHeaders(_prevState => exportHeaders)
      dispatch({type: 'SET_DOCUMENTS', payload: selectedRows})
      console.log(documents)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
    columnWidth: '5%'
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node)
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <AntButton
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </AntButton>
        <AntButton onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </AntButton>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
			let s = dataIndex.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
			s = s.replace(/^\./, '');           // strip a leading dot
			let a = s.split('.');
			for (let i = 0, n = a.length; i < n; ++i) {
				let k = a[i];
        record = record[k];
        if (record === undefined) {
          return
        }
			}

      const isSearched = record
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())

      return isSearched
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          if (searchInput === null || searchInput === undefined) {
            return null
          } else {
            return searchInput.select()
          }
        })
      }
    },
    render: text =>{
      if (text === undefined) {
        return
      }
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )},
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }
  const columns = [
    {
      title: "Image",
      //dataIndex: "ImageURL",  // this is the value that is parsed from the DB / server side
      dataIndex: "image_path",  // this is the value that is parsed from the DB / server side
      width: '10%',
      render: () => (<Zoom><img width="100px" alt='https://www.cocodecow.com/forest/goods/images/p/559098a.jpg' src='https://www.cocodecow.com/forest/goods/images/p/559098a.jpg' /></Zoom>)  // 'theImageURL' is the variable you must declare in order the render the URL
      //render: (image_path) => (<Zoom><img width="100px" alt={image_path} src={image_path} /></Zoom>)  // 'theImageURL' is the variable you must declare in order the render the URL
    },
    {
      title: 'Company',
      dataIndex: 'document_content.doc_object[0].instances[1].会社名',
      key: 'company',
      width: '20%',
      ...getColumnSearchProps('document_content.doc_object[0].instances[1].会社名'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Document Type',
      dataIndex: 'document_type',
      key: 'document_type',
    },
    // TODO: Need to get all mechandises
    {
      title: 'Mechandises',
      dataIndex: 'document_content.doc_object[1].instances[0].商品.instances[0].商品名',
      key: 'mechandises',
      width: '20%',
      ...getColumnSearchProps('document_content.doc_object[1].instances[0].商品.instances[0].商品名'),
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'document_content.created_at',
      key: 'uploadeddate',
      width: '20%',
      ...getColumnSearchProps('document_content.created_at'),
    },
  ]
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isSecondOpen, setIsSecondOpen] = useState<boolean>(false)
  const onClick = useCallback(() => {
    setIsOpen(!isOpen)
    router.push('/', '/', {shallow: true})
  }, [isOpen])
  const onSecondClick = useCallback(() => {
    setIsSecondOpen(!isSecondOpen)
  }, [isSecondOpen])
  const [rowIndex, setRowIndex] = useState<number>()
  const [record, setRecord] = useState<string>()
  const hasSelected = selectedRows.length > 0;

  const getHeadersSetList = (headers: CSVHeaders): CSVHeaders => {
    const headersSet = new Set(headers.map((header) => JSON.stringify(header)))
    let headersSetList: CSVHeaders = [...headersSet].map((header) => JSON.parse(header))
    return headersSetList
  }

  type CSVHeader = {
    label: string,
    key: string
  }
  type CSVHeaders = CSVHeader[]


  // TODO: This initialState is not genaral, meaning that only corresponging to Invoice(Just changing company name may work better)
  const headerInit: CSVHeaders = [
		{ label: 'Document Name', key: 'name' },
    // TODO: here should be deleted or refactored
		{ label: 'Company Name', key: 'document_content.doc_object[0].instances[1].会社名' },
		{ label: 'Document Type', key: 'document_type' },
		{ label: 'Updated Date', key: 'document_content.created_at' },
  ]
  const [csvHeaders, setCSVHeaders] = useState<CSVHeaders>(headerInit)

	useEffect(() => {
			console.log('csvHeaders', csvHeaders); // not late
		}, [csvHeaders]);

  const headerCreator = (selectedRows) => {
    let exportHeaders: CSVHeaders = headerInit
    selectedRows.map((selectedRow) => {
      const docObjects = selectedRow['document_content']['doc_object']
      return docObjects.map((docElement, index) => {
        let tmpDir: CSVHeader = {
          label: docElement['name'],
          key: `document_content.doc_object[${index}].name`
        }
        exportHeaders = [...exportHeaders, tmpDir]

        recursiveDocElementHeader(docElement, `document_content.doc_object[${index}]`).map((element) => {
          exportHeaders = [...exportHeaders, ...element]
        })
        //docObject['instances'].map((docElement, index) => {
        //  recursiveDocElementHeader(docElement, index)
        //})
      })
    })
    return flattenExportHeaders(exportHeaders)
  }

  // TODO: This method could be a general function for flatting an array
  // NOTE: This method can be alternated by "_.flattenDeep(array)" of lodash
  const flattenExportHeaders = (exportHeaders: CSVHeaders) => {
    const flat: CSVHeaders = []

    exportHeaders.forEach(header => {
      if (Array.isArray(header)) {
        flat.push(...flattenExportHeaders(header))
      } else {
        flat.push(header)
      }
    })

    return flat
  }


  const recursiveDocElementHeader = (docElement, baseKey) => {
    return docElement['instances'].map((instance, index) => {
      return Object.keys(instance).map((key) => {
        const value = instance[key]
        switch (typeof value) {
          case 'string':
            let tmpDir = {
              label: key,
              key: baseKey + `.instances[${index}].${key}`
            }
            return tmpDir
          case 'object':
            // FIXME: Need to pass corresponded key to "index"
            return recursiveDocElementHeader(value, baseKey + '.' + key)
          default:
            return {key: '', label: ''}
        }
      })
    })
  }

  const dlButtonOnClick = useCallback((selectedRows) => {
    headerCreator(selectedRows)
  }, [])

  return (
    <>
			<div style={{ marginBottom: 16 }}>
				<span style={{ marginLeft: 8 }}>
          <AntButton type="primary" disabled={!hasSelected} loading={downloadButtonLoading}>
            <CSVLink data={selectedRows} headers={csvHeaders} filename={`nExt_${moment(new Date()).format('YYYY_MM_DD_hh_mm_ss')}.csv`}>
              Download
            </CSVLink>
          </AntButton>
        </span>
				<span style={{ marginLeft: 8 }}>
					{hasSelected ? `Selected ${selectedRows.length} items` : ''}
				</span>
			</div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        onRow={(_record, _rowIndex) => {
          return {
            onDoubleClick: _event => {
              //router.push(`/document/${_rowIndex}`, `/document/${rowIndex}`, {shallow: true})
              setRowIndex(_rowIndex)
              setRecord(JSON.stringify(_record))
              onClick()
            }
          }
        }}
        pagination={{ pageSize: 100 }}
        //scroll={{ y: 800 }}
      />
      <AntDrawer
        title="Document Details"
        placement="right"
        closable={true}
        onClose={onClick}
        visible={isOpen}
        width="83%"
        height="30%"
      >
        <DocumentModalContent imagePath={'https://iroha.corec.jp/customer/portal/attachments/549065'} documentObject={record} />
      </AntDrawer>
    </>
  )
}

const DrawerButton = ({onClick}) => {
  return (
    <AntButton onClick={onClick}>
      Drawer
    </AntButton>
  )
}

export default MyTable
