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
import styles from './index.module.scss'

// ex: { x: 2000, 鳥取: 400, 島根: 240 },
interface LineChartBoxProps extends lineChartDataType {}
const LineChartBox: FC<LineChartBoxProps> = ({ data = [] }) => {
  if (Array.isArray(data) && data.length !== 0) {
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
  } else
    return (
      <div className={styles.error_wrapper}>
        <div>データエラー</div>
        <div>データの取得に失敗しました。グラフを描画できません</div>
      </div>
    )
}
export default LineChartBox
