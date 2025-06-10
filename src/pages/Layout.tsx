// import type { FC } from 'react'
// import { Outlet } from 'react-router-dom'
// import Header from '../components/Header'

// const Layout: FC = () => {
//   return (
//     <div className="min-h-screen bg-slate-800 pb-20 font-roboto">
//       <Header/>
//       {/* <div className="container">cont</div> */}
//       <Outlet />
//     </div>
//   )
// }

// export default Layout
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 pb-20 font-roboto">
      <Header />
      <div className="px-4 md:px-8 lg:px-16 max-w-[1200px] mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
