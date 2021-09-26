export interface lineChartDataType {
  data: lineChartSingleType[]
}
export interface lineChartSingleType {
  x: number
  [key: string]: number | string
  // ex: { x: 2000, 宮城県: 400, 岩手: 20 }
}
