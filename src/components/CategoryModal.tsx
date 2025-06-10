import type { FC } from 'react'
import { Form } from 'react-router-dom'
interface ICategoriaModale {
  type: 'post' | 'patch'
  id?: number
  setVisibleModal: (visible: boolean) => void
}
const CategoriaModale: FC<ICategoriaModale> = ({
  type,
  id,
  setVisibleModal,
}) => {
  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form
        action="/categories"
        method={type}
        onSubmit={()=> setVisibleModal(false)}
        className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-white text-sm">
            Category Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title..."
            className="input w-full"
          />
          <input type="hidden"  name='id' value={id}/>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button className="btn btn-green px-4 py-2 rounded-md ">
            {type === 'patch' ? 'Save' : 'Create'}
          </button>

          <button onClick={()=> setVisibleModal(false)} className="btn btn-red">Close</button>
        </div>
      </Form>
    </div>
  )
}

export default CategoriaModale
