import { FC } from 'react'
import styles from './index.module.scss'
interface CheckAreaProps {
  labelText: string
  isChecked: boolean
  onChange: () => void
}
const CheckArea: FC<CheckAreaProps> = (props: CheckAreaProps) => {
  const { labelText = '', isChecked = false, onChange } = props
  return (
    <div className={styles.contents_wrapper}>
      <input
        checked={isChecked}
        type='checkbox'
        id={`${labelText}_checkbox`}
        onChange={() => onChange()}
      />
      <label htmlFor={`${labelText}_checkbox`}>{labelText}</label>
    </div>
  )
}
export default CheckArea
