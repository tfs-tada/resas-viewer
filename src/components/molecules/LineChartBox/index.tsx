import { FC } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { lineChartDataType } from '../../../interfaces/graphPropsType'

// ex: { x: 2000, 鳥取: 400, 島根: 240 },
interface LineChartBoxProps extends lineChartDataType {}
const LineChartBox: FC<LineChartBoxProps> = ({ data }) => {
  if (Array.isArray(data)) {
    return (
      <ResponsiveContainer>
        <LineChart data={data}>
          {Object.keys(data[0])
            .filter((e) => e !== 'x')
            .map((e) => (
              <Line key={e} type='linear' dataKey={e} stroke='#8884d8' />
            ))}
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='x' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    )
  } else return <div>データエラー</div>
}
export default LineChartBox
