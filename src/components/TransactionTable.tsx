import { useEffect, useState, type FC } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { formatCurrency } from '../helper/currency.heleper'
import { formatDate } from '../helper/date.helper'
import type { ITransaction, IResponseTransactionLouder } from '../types/taypes'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'
interface ITransactionTable {
  Limit:number
}
const TransactionTable: FC<ITransactionTable> = ({Limit=3}) => {
  const { transactions } = useLoaderData() as IResponseTransactionLouder
  // console.log(transactions, 'test')

  const [data, setData] = useState<ITransaction[]>([])
  const [curentPage,setCurrentPage] = useState<number>(1)
  const [totalPage,setTotalPage] = useState<number>(0)

  const fetchTransactions =async (page:number) =>{
    // const response = await instance.get(`/transactions/pagination?page=${page}&Limit=${Limit}`)
  const response = await instance.get(`/transactions/pagination?page=${page}&Limit=${Limit}`)

setData(response.data.items)
  setTotalPage(Math.ceil(response.data.total / Limit))
    // setData(response.data)
    // setTotalPage(Math.ceil(transactions.length / Limit))
  }
  const hendlePageChange =(selectedItem: {selected: number})=>{
    setCurrentPage(selectedItem.selected+1)
  }
  useEffect (()=>
  {
    fetchTransactions(curentPage)
  }, [curentPage,transactions])




// useEffect(() => {
//   const fetchTransactions = async (page: number) => {
//     const res = await instance.get(`/transactions/pagination?page=${page}&Limit=${Limit}`)

//     console.log('API Response:', res.data)

//     setData(res.data.items)
//     setTotalPage(Math.ceil(res.data.total / Limit))
//   }

//   fetchTransactions(curentPage)
// }, [curentPage])


  return (

    <>

  {/* <ReactPaginate
  className='flex gap-3 justify-end mt-4 items-center'
  activeClassName='bg-blue-600 rounded-md'
  pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
  previousLinkClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs '
    nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs '
    disabledLinkClassName='text-slate-600 cursor-not-allowed'
      activeLinkClassName="bg-blue-600 text-white rounded-md"

    disabledClassName='text-white/50 cursor-not-allowed'
    pageCount={totalPage}
    pageRangeDisplayed={1}
    marginPagesDisplayed={2}
    onPageChange={hendlePageChange}

  /> */}
  <ReactPaginate
  className="flex gap-3 justify-end mt-4 items-center"
  pageCount={totalPage}
  pageRangeDisplayed={1}
  marginPagesDisplayed={2}
  onPageChange={hendlePageChange}

  pageLinkClassName="text-white text-xs py-1 px-2 rounded-md transition"
  previousLinkClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
  nextLinkClassName="text-white py-1 px-2 bg-slate-800 rounded-md text-xs"
  disabledLinkClassName="text-slate-600 cursor-not-allowed rounded-sm"
  disabledClassName="opacity-50 cursor-not-allowed"

  activeClassName="selected"
/>


      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold"> N</td>
              <td className="font-bold">Title</td>
              <td className="font-bold"> Amount ($)</td>
              <td className="font-bold">Category</td>
              <td className="font-bold">Data</td>
              <td className="text-right">Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {transaction.type === 'income'
                    ? formatCurrency(transaction.amount, 'USD')
                    : '-' + formatCurrency(transaction.amount, 'USD')}
                </td>
                <td>{transaction.category?.title || 'Other'}</td>
                <td>{formatDate(transaction.createdAt)}</td>

                <td>

                  <Form method='delete' action='transactions'>
                    <input type="hidden" name='id' value={transaction.id} />
                    <button className="btn btn-red ml-auto">
                    <FaTrash />
                  </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TransactionTable
