import { type FC } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const COLORS = ['#00C49F', '#FF8042']

interface IChart {
  totalIncome: number
  totalExpanse: number
}

interface IData {
  value: number
  name: string
}



const Chart: FC <IChart> = ({ totalExpanse, totalIncome }) => {
  const data = new Array<IData>(
    { value: totalExpanse, name: 'Expanse' },
    { value: totalIncome, name: 'Income' }
  )

  return (
    <PieChart width={240} height={240} >
      <Pie
        data={data}
        cx={'50%'}
        cy={'50%'}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={3}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  )
}

export default Chart
