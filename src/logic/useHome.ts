import { city } from '@/assets/city'
import { Observable } from 'rxjs'
import {
  getActivity,
  getTourism,
  getRestaurant,
  getHotel,
} from '@/api'
import { shuffle } from './utils'

import type {
  City,
  IHotCity,
  IScenicSpotTourismInfo,
  IActivityTourismInfo,
  IRestaurantTourismInfo,
  IHotelTourismInfo,
  IType,
} from '@/types'

const perPageItem = 30
export function useHome() {
  const route = useRoute()

  const isLoading = ref(false)
  const loadingCount = ref(0)
  const cityOptions = reactive<City[]>(city)
  const searchHistory = reactive<string[]>([])

  const hotCity = reactive<IHotCity[][]>([[]])
  const hotActivity = reactive<IActivityTourismInfo[]>([])

  const scenicSpot = reactive<IScenicSpotTourismInfo[]>([])
  const displayScenicSpot = computed(() => scenicSpot.slice(0, selectedType.value ? perPageItem : 10))

  const activity = reactive<IActivityTourismInfo[]>([])
  const displayActivity = computed(() => activity.slice(0, selectedType.value ? perPageItem : 10))

  const restaurant = reactive<IRestaurantTourismInfo[]>([])
  const displayRestaurant = computed(() => restaurant.slice(0, selectedType.value ? perPageItem : 10))

  const hotel = reactive<IHotelTourismInfo[]>([])
  const displayHotel = computed(() => hotel.slice(0, selectedType.value ? perPageItem : 10))

  const curPage = ref(1)
  const showNextPage = computed(() => {
    switch (selectedType.value) {
      case 'ScenicSpot':
        return scenicSpot.length >= perPageItem
      case 'Hotel':
        return hotel.length >= perPageItem
      case 'Restaurant':
        return restaurant.length >= perPageItem
      case 'Activity':
        return activity.length >= perPageItem
    }

    if (route.path.includes('/hotel')) {
      return hotel.length >= perPageItem || restaurant.length >= perPageItem
    }

    return scenicSpot.length >= perPageItem || activity.length >= perPageItem
  })

  watch(curPage, () => refetch())

  const searchKeyword = ref('')
  const setSearchKeyword = (v: string) => {
    searchKeyword.value = v
    refetch()
  }

  const clearSearchHistory = () => {
    searchHistory.splice(0, searchHistory.length)
  }

  const searchByKeyword = async () => {
    let filter;
    if (searchKeyword.value) {
      filter = `contains(Name,'${searchKeyword.value}')`
      const keywordIdx = searchHistory.indexOf(searchKeyword.value)
      if (keywordIdx > -1) {
        searchHistory.splice(keywordIdx, 1)
      }

      searchHistory.unshift(searchKeyword.value)
    }

    let city, type;

    if (selectedCity.City) city = selectedCity.City
    if (selectedType.value) type = selectedType.value

    switch (type) {
      case 'ScenicSpot':
        return fetchScenicSpot()
      case 'Hotel':
        return fetchHotel()
      case 'Restaurant':
        return fetchRestaurant()
      case 'Activity':
        return fetchActivity()
    }

    if (route.path.includes('hotel')) {
      const resp1 = await getHotel({ city, filter, page: curPage.value })
      const resp2 = await getRestaurant({ city, filter, page: curPage.value })
      hotel.splice(0, hotel.length)
      restaurant.splice(0, restaurant.length)
      hotel.push(...resp1.data)
      restaurant.push(...resp2.data)
      return
    }

    const resp1 = await getActivity({ city, filter, page: curPage.value })
    const resp2 = await getTourism({ city, filter, page: curPage.value })
    scenicSpot.splice(0, scenicSpot.length)
    activity.splice(0, activity.length)
    scenicSpot.push(...resp2.data)
    activity.push(...resp1.data)
  }

  const refetch = () => {
    scenicSpot.splice(0, scenicSpot.length)
    activity.splice(0, activity.length)
    hotel.splice(0, hotel.length)
    restaurant.splice(0, restaurant.length)

    searchByKeyword()
  }

  const selectedType = reactive<IType>({
    text: '',
    value: '',
  })

  const setSelectedType = (value: IType) => {
    if (!value) return
    selectedType.value = value.value
    selectedType.text = value.text

    curPage.value = 1
    refetch()
  }

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

    curPage.value = 1
    refetch()
  }

  const reset = () => {
    selectedType.text = ''
    selectedType.value = ''
    selectedCity.City = ''
    selectedCity.CityCode = ''
    selectedCity.CityID = ''
    selectedCity.CityName = ''
    selectedCity.CountyID = ''
    searchKeyword.value = ''

    curPage.value = 1
    fetchData()
  }

  const fetchHotCity = async () => {
    loadingCount.value += 1
    try {
      const getCityTourism = async (city: City) => {
        const resp: IScenicSpotTourismInfo[] = (await getTourism({ city: city.City })).data
        const [firstGet] = shuffle<IScenicSpotTourismInfo>(resp)
        const image = firstGet?.Picture?.PictureUrl1

        return {
          ...city,
          image
        }
      }

      const city$ = new Observable((subscriber) => {
        const cities = shuffle(cityOptions)
        
        cities.map((el, i) => {
          getCityTourism(el)
            .then((resp) => {
              subscriber.next(resp)
              if (i === cities.length - 1) {
                subscriber.complete()
              }
            })
            
        })
      })

      const arr: IHotCity[] = []
      city$.subscribe({
        next: (x: any) => arr.push(x),
        error: (error) => {
          console.error(error)
          loadingCount.value -= 1
        },
        complete: () => {
          hotCity.splice(0, hotCity.length)
          hotCity.push(...arr.reduce((res: IHotCity[][], cur: IHotCity, idx: number) => {
            const chunckIndex = Math.floor(idx / 3)
            if (!res[chunckIndex]) {
              res[chunckIndex] = []
            }

            res[chunckIndex].push(cur)
            return res
          }, [] as IHotCity[][]))

          loadingCount.value -= 1
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  const fetchHotActivity = async () => {
    loadingCount.value += 1
    try {
      hotActivity.splice(0, hotActivity.length)
      const randomNum = Math.floor(Math.random() * 20)
      const activityResp: IActivityTourismInfo[] = (await getActivity({ top: 4, skip: randomNum })).data
      hotActivity.push(...shuffle(activityResp))
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => {
      loadingCount.value -= 1
    }, 10)
  }

  const fetchScenicSpot = async (filter?: string) => {
    loadingCount.value += 1
    const city = selectedCity.City
    const tourismResp: IScenicSpotTourismInfo[] = (await getTourism({
      city,
      filter,
      page: curPage.value
    })).data

    scenicSpot.splice(0, scenicSpot.length)
    scenicSpot.push(...shuffle(tourismResp))

    setTimeout(() => {
      loadingCount.value -= 1
    }, 10)
  }

  const fetchActivity = async (filter?: string) => {
    loadingCount.value += 1
    try {
      activity.splice(0, activity.length)
      const city = selectedCity.City
      const activityResp: IActivityTourismInfo[] = (await getActivity({
        city,
        filter,
        page: curPage.value
      })).data

      activity.push(...activityResp)
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => {
      loadingCount.value -= 1
    }, 10)
  }

  const fetchRestaurant = async (filter?: string) => {
    loadingCount.value += 1
    try {
      restaurant.splice(0, restaurant.length)

      const city = selectedCity.City
      const restaurantResp: IRestaurantTourismInfo[] = (await getRestaurant({
        city,
        filter,
        page: curPage.value
      })).data

      restaurant.push(...restaurantResp)
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => {
      loadingCount.value -= 1
    }, 10)
  }

  const fetchHotel = async (filter?: string) => {
    loadingCount.value += 1

    try {
      hotel.splice(0, hotel.length)
      const city = selectedCity.City
      if (filter) {
        filter += 'and Spec ne null '
      } else {
        filter = 'Spec ne null '
      }
      const hotelResp: IHotelTourismInfo[] = (await getHotel({
        city,
        filter,
        page: curPage.value
      })).data

      hotel.push(...shuffle(hotelResp))
    } catch (e) {
      console.error(e)
    }

    setTimeout(() => {
      loadingCount.value -= 1
    }, 10)
  }

  const fetchData = async () => {
    fetchHotCity()
    fetchHotActivity()
    fetchRestaurant()
    fetchHotel()
  }

  watch(loadingCount, () => {
    isLoading.value = !(loadingCount.value === 0)
  })

  return {
    isLoading,
    cityOptions,
    hotCity,
    scenicSpot,
    displayScenicSpot,
    fetchScenicSpot,
    hotActivity,
    activity,
    displayActivity,
    fetchActivity,
    restaurant,
    displayRestaurant,
    fetchRestaurant,
    hotel,
    displayHotel,
    fetchHotel,
    searchKeyword,
    setSearchKeyword,
    fetchData,
    selectedType,
    setSelectedType,
    selectedCity,
    setSelectedCity,
    searchByKeyword,
    searchHistory,
    clearSearchHistory,
    reset,
    refetch,
    curPage,
    showNextPage,
  }
}