// /api/v1/prefectures
export interface prefecturesApiType {
  message: null
  result: {
    prefCode: number
    prefName: string
  }[]
}

// /api/v1/population/composition/perYear?cityCode=11362&prefCode=11
type populationCompositionApiLabel = '総人口' | '年少人口' | '老年人口'
export interface populationCompositionApiType {
  message: null
  result: {
    boundaryYear: number
    data: {
      label: populationCompositionApiLabel
      data: {
        year: number
        value: number
      }[]
    }[]
  }
}
