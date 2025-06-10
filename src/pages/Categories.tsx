import { useState, type FC } from 'react'
import { AiFillClockCircle, AiFillEdit } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { instance } from '../api/axios.api'
import CategoryModal from '../components/CategoryModal'
import type { ICategory } from '../types/taypes'

export const categoriesAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData()
      const title = {
        title: formData.get('title'),
      }
      await instance.post('/categories', title)
      return null
    }
    // case 'PATCH': {
    //   const formData = await request.formData()
    //   const category ={
    //     id: formData.get('id'),
    //     title: formData.get('title'),
    //   }
    //   await instance.patch(`/categories/category/${category.id}`,category)
    //   return null
    // }
    case 'PATCH': {
  const formData = await request.formData()
  const id = formData.get('id')
  const title = formData.get('title')

  await instance.patch(`/categories/category/${id}`, { title })
  return null
}

    case 'DELETE': {
      const formData = await request.formData()
      const categoryId = formData.get('id')
      await instance.delete(`/categories/category/${categoryId}`)

    }
 return null
  }
}

export const categoryLouder = async (args: unknown) => {
  const { data } = await instance.get<ICategory[]>('/categories')
  return data
}

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[]
  const [categoryId,setCategoryId] = useState<number>(0)
  const [isEdit,setIsEdit]= useState<boolean>(false)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  return (
    <>
      <div className="mt-10 rounded-md bg-slate-800 p-4">
        <h1 className="text-white/80">Your category list:</h1>
        {/* category list */}
        <div className="mt-2 flex  flex-wrap items-center gap-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2"
            >
              <div className="text-white">{category.title}</div>
              <div className="absolute hidden bottom-0 left-0 right-0 top-0  items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex">
                <button onClick={()=>{
                  setCategoryId(category.id)
                  setVisibleModal(true)
                  setIsEdit(true)
                }} className="text-white/70 hover:text-white transition">
                  <AiFillEdit />
                </button>
                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    type="submit"
                    className="text-white/70 hover:text-white transition"
                  >
                    <AiFillClockCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setVisibleModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white mt-5"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>
      {/* add cotegory modal  */}
      {visibleModal && (
        <CategoryModal type="post" setVisibleModal={setVisibleModal} />
      )}
    {/* edit cotegory modal  */}
       {visibleModal &&  isEdit &&(
        <CategoryModal type="patch" id={categoryId} setVisibleModal={setVisibleModal} />
      )}
    </>
  )
}

export default Categories
