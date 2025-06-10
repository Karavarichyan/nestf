import type { FC } from 'react'
import { toast } from 'react-toastify'
import { instance } from '../api/axios.api'
import TranscationForm from '../components/TranscationForm'
import type { ICategory } from '../types/taypes'

export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>('/categories')

  const data = {
    categories: categories.data,
    // transaction: transaction.data,
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
        category:  +formData.get('category'),
        type: formData.get('type'),
      }
      await instance.post('/transactions', newTransaction)
      toast.success('Transaction Added.')
      return null
    }
    case 'DELETE': {
    }
  }
}
const Transactions: FC = () => {
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
                100$
              </p>
            </div>
            <div>
              <p className="uppercase text-md font-bold text-center">
                Total Expance:
              </p>
              <p className="bg-red-500 p-1 rounded-sm mt-2 text-center">100$</p>
            </div>
          </div>
          <>chart</>
        </div>
      </div>

      {/* transactions  table */}
      <h1 className="m-5">Table</h1>
    </>
  )
}

export default Transactions
