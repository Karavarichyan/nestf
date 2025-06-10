import { useState, type FC } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import type { IResponseTransactionLouder } from '../types/taypes'
import CategoryModal from './CategoryModal'

const TranscationForm: FC = () => {
    const { categories} = useLoaderData() as IResponseTransactionLouder
const [visibleModal,setVisibleModal] = useState(false)
  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>title</span>
          <input
            className="input border-slate-900"
            type="text"
            placeholder="Title..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Amount</span>
          <input
            className="input  border-slate-900"
            type="number"
            placeholder="Amount..."
            name="amount"
            required
          />
        </label>


        {categories.length ? <label htmlFor="category" className='grid'>
          <span>Category</span>
          <select className='input border-slate-700' name="category" required>
           {categories.map((ctg,index)=>(
            <option key={index} value={ctg.id}>
              {ctg.title}

            </option>
           ))}
          </select>
        </label> : <h1 className=' mt-1 text-red-300'> To continu create a category first</h1> }

        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white "
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        {/* radio botoons */}
        <div className="flex gap-4 items-center">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'income'}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'expense'}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>
        {/* submit buuton */}
        <button className='btn btn-green  max-w-fit mt-2 text-white'>Submit</button>
      </Form>
{/* add cotegory modal  */}
      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}

    </div>
  )
}

export default TranscationForm
