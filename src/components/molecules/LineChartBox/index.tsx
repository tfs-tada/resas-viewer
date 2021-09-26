import { FC } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from 'recharts'
import { lineChartDataType } from '../../../interfaces/graphPropsType'
import styles from './index.module.scss'

const colorListRandom = [...Array(100)].map(
  (_) =>
    `rgb(${~~(256 * Math.random())},${~~(256 * Math.random())},${~~(
      256 * Math.random()
    )})`
)

// ex: { x: 2000, 鳥取: 400, 島根: 240 },
interface LineChartBoxProps extends lineChartDataType {
  xLabel: string
  yLabel: string
}
const LineChartBox: FC<LineChartBoxProps> = ({ data = [], xLabel, yLabel }) => {
  if (Array.isArray(data) && data.length !== 0) {
    return (
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ left: 20, right: 20, bottom: 20, top: 20 }}
        >
          {Object.keys(data[0])
            .filter((e) => e !== 'x')
            .map((e, idx) => (
              <Line
                key={e}
                type='linear'
                dataKey={e}
                stroke={colorListRandom[idx % 100]}
                isAnimationActive={false}
              />
            ))}
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='x'>
            <Label position={'bottom'}>{xLabel}</Label>
          </XAxis>
          <YAxis>
            <Label position={'left'} angle={-90}>
              {yLabel}
            </Label>
          </YAxis>
          <Tooltip />
          <Legend verticalAlign='top' align='right' layout='vertical' />
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
