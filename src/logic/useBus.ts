import { getEstimateRoute, getRoutes, getRouteStops } from '@/api'
import { IBusEstimateTime, City, IBusStopOfRoute, IRoute, NameType, TStop } from '@/types'

interface IStopInfo extends TStop<string> {
  timeInfo?: IBusEstimateTime[]
}

interface IStopOfRoute extends IBusStopOfRoute<string> {
  Stops: IStopInfo[]
}

export function useBus() {
  const selectedCity = reactive<City>({
    City: '',
    CityCode: '',
    CityID: '',
    CityName: '',
    CountyID: '',
  })

  const setSelectedCity = (value: City) => {
    if (!value) return
    selectedCity.City = value.City
    selectedCity.CityCode = value.CityCode
    selectedCity.CityID = value.CityID
    selectedCity.CityName = value.CityName
    selectedCity.CountyID = value.CountyID

    fetchRoutes()
  }

  const routeData = reactive<IRoute<string>[]>([])
  const timer = ref<any>()
  const fetchRoutes = async () => {
    clearInterval(timer.value)
    selectedRoute.TaiwanTripName = ''
    selectedRoute.DepartureStopNameZh = ''
    selectedRoute.DestinationStopNameZh = ''
    routeData.splice(0, routeData.length)

    const routeResp: IRoute<string>[] = (await getRoutes({
      select: 'TaiwanTripName,DepartureStopNameZh,DestinationStopNameZh',
      filter: `City eq '${selectedCity.City}'`
    })).data.map((el: IRoute<NameType>) => ({
      ...el,
      TaiwanTripName: el.TaiwanTripName.Zh_tw
    }))

    routeData.push(...routeResp)
    stops.splice(0, stops.length)
  }

  const selectedRoute = reactive<IRoute<string>>({
    TaiwanTripName: '',
    DepartureStopNameZh: '',
    DestinationStopNameZh: '',
  })

  const setSelectedRoute = (r: IRoute<string>) => {
    selectedRoute.TaiwanTripName = r.TaiwanTripName
    selectedRoute.DepartureStopNameZh = r.DepartureStopNameZh
    selectedRoute.DestinationStopNameZh = r.DestinationStopNameZh

    fetchSpecificRoute()
    timer.value = setInterval(() => fetchSpecificRoute(), 15000)
  }

  const stops = reactive<IStopOfRoute[]>([])

  const fetchSpecificRoute = async () => {
    stops.splice(0, stops.length)
    const stopeResp: IBusStopOfRoute<string>[] = (await getRouteStops(selectedRoute.TaiwanTripName, {
      select: 'RouteUID,Direction,Stops,UpdateTime'
    })).data.map((el: IBusStopOfRoute<NameType>) => ({
      ...el,
      Stops: el.Stops.map((stop: TStop<NameType>) => ({
        ...stop,
        StopName: stop.StopName.Zh_tw
      })).sort((a, b) => a.StopSequence - b.StopSequence)
    }))
  
    stops.push(...stopeResp)

    const estimateResp = await fetchEstimateRoute()
    for (let i = 0; i < stops.length; i += 1) {
      stops[i].Stops = stops[i].Stops.map((el) => {
        const res: IStopInfo = JSON.parse(JSON.stringify(el))
        const busData = estimateResp.find((estimateEl) => el.StopUID === estimateEl.StopUID)
        if (busData) {
          if (res.timeInfo) {
            res.timeInfo.push(busData)
          } else {
            res.timeInfo = [busData]
          }
        }
        return res
      })
    }
  }

  const direction = ref(0)

  const fetchEstimateRoute = async (): Promise<IBusEstimateTime[]> => {
    const estimateResp: IBusEstimateTime[] = (await getEstimateRoute(selectedRoute.TaiwanTripName, {
      select: 'PlateNumb,StopUID,CurrentStop,Direction,EstimateTime,StopCountDown,DestinationStop,StopStatus,NextBusTime,UpdateTime',
      // filter: `Direction eq ${direction.value}`
    })).data

    return estimateResp
  }
  return {
    selectedCity,
    setSelectedCity,
    routeData,
    selectedRoute,
    setSelectedRoute,
    direction,
    stops,
  }
}