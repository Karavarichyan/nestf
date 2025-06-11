import type { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import TransactionTable from '../components/TransactionTable'
import TranscationForm from '../components/TranscationForm'
import { formatCurrency } from '../helper/currency.heleper'
import Chart from '../components/Chart'
import type {
  ICategory,
  IResponseTransactionLouder,
  ITransaction,
} from '../types/taypes'

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>('/categories')
  const transactions = await instance.get<ITransaction[]>('/transactions')
  const totalIncome = await instance.get<number>('/transactions/income/find')
  const totalExpanse = await instance.get<number>('/transactions/expanse/find')

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalExpanse: totalExpanse.data,
    totalIncome: totalIncome.data,
  }
  return data
}
export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData()
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: +formData.get('category'),
        type: formData.get('type'),
      }
      await instance.post('/transactions', newTransaction)
      toast.success('Transaction Added.')
      return null
    }
    case 'DELETE': {
      const formData = await request.formData()
      const transactionId = formData.get('id')
      await instance.delete(`/transactions/transaction/${transactionId}`)
      toast.success('transactione Delited')
      return null
    }
  }
}
const Transactions: FC = () => {
  const { totalExpanse, totalIncome } =
    useLoaderData() as IResponseTransactionLouder
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4 items-start">
        {/* add transactions form */}
        <div className="grid col-span-2">
          {/* add transactions form */}
          <TranscationForm />
        </div>

        {/* statistics boloce */}
        <div className="rounded-md  bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Income:
              </p>
              <p className="bg-green-600 p-1 rounded-sm mt-2 text-center">
                {formatCurrency(totalIncome)}
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Expanse:
              </p>
              <p className="bg-red-500 p-1 rounded-sm mt-2 text-center">
                {' '}
                {formatCurrency(totalExpanse)}
              </p>
            </div>
          </div>
          <>
          <Chart  totalExpanse={totalExpanse} totalIncome={totalIncome}/>

          </>
        </div>
      </div>

      {/* transactions  table */}
      <h1 className="m-5">
        <TransactionTable Limit={5} />
      </h1>
    </>
  )
}

export default Transactions
