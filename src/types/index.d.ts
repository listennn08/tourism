export type City = {
  CityID: string
  CityName: string
  CityCode: string
  City: string
  CountyID: string
  Version?: string
}

export interface IType {
  text: string
  value: string
}

export interface IHotCity {
  cityName: string,
  city: string,
  image: string,
}

export interface IScenicSpotTourismInfo {
  //  (String): 景點代碼 ,
  ID: string
  //  (String, optional): 景點名稱 ,
  Name?: string
  //  (String, optional): 景點特色詳細說明 ,
  DescriptionDetail?: string
  //  (String, optional): 景點特色精簡說明 ,
  Description?: string
  //  (String, optional): 景點服務電話 ,
  Phone?: string
  //  (String, optional): 景點地址 ,
  Address?: string
  //  (String, optional): 郵遞區號 ,
  ZipCode?: string
  //  (String, optional): 交通資訊 ,
  TravelInfo?: string
  //  (String, optional): 開放時間 ,
  OpenTime?: string
  //  (TourismPicture, optional): 景點照片 ,
  Picture?: TourismPicture
  //  (String, optional): 景點地圖/簡圖介紹網址 ,
  MapUrl?: string
  //  (PointType, optional): 景點位置 ,
  Position?: Point
  //  (String, optional): 景點分類1 ,
  Class1?: string
  //  (String, optional): 景點分類2 ,
  Class2?: string
  //  (String, optional): 景點分類3 ,
  Class3?: string
  //  (String, optional): 古蹟分級 ,
  Level?: string
  //  (String, optional): 景點官方網站網址 ,
  WebsiteUrl?: string
  //  (String, optional): 停車資訊 ,
  ParkingInfo?: string
  //  (PointType, optional): 景點主要停車場位置 ,
  ParkingPosition?: string
  //  (String, optional): 票價資訊 ,
  TicketInfo?: string
  //  (String, optional): 警告及注意事項 ,
  Remarks?: string
  //  (String, optional): 常用搜尋關鍵字 ,
  Keyword?: string
  //  (String, optional): 所屬縣市 ,
  City?: string
  //  (DateTime): 觀光局檔案更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  SrcUpdateTime: string
  //  (DateTime): 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

export interface IActivityTourismInfo {
  //  (String): 活動訊息代碼 ,
  ID: string
  //  (String, optional): 活動名稱 ,
  Name?: string
  //  (String, optional): 活動簡述 ,
  Description?: string
  //  (String, optional): 活動參與對象 ,
  Particpation?: string
  //  (String, optional): 主要活動地點名稱 ,
  Location?: string
  //  (String, optional): 主要活動地點地址 ,
  Address?: string
  //  (String, optional): 活動聯絡電話 ,
  Phone?: string
  //  (String, optional): 活動主辦單位 ,
  Organizer?: string
  //  (string, optional): 活動開始時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  StartTime?: string
  //  (string, optional): 活動結束時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  EndTime?: string
  //  (String, optional): 週期性活動執行時間 ,
  Cycle?: string
  //  (String, optional): 非週期性活動執行時間 ,
  NonCycle?: string
  //  (String, optional): 活動網址 ,
  WebsiteUrl?: string
  //  (TourismPicture, optional): 活動照片 ,
  Picture?: TourismPicture
  //  (PointType, optional): 活動位置 ,
  Position?: Point
  //  (String, optional): 活動分類1 ,
  Class1?: string
  //  (String, optional): 活動分類2 ,
  Class2?: string
  //  (String, optional): 活動地圖/簡圖連結網址 ,
  MapUrl?: string
  //  (String, optional): 交通資訊 ,
  TravelInfo?: string
  //  (String, optional): 停車資訊 ,
  ParkingInfo?: string
  //  (String, optional): 費用標示 ,
  Charge?: string
  //  (String, optional): 備註(其他活動相關事項) ,
  Remarks?: string
  //  (String, optional): 所屬縣市 ,
  City?: string
  //  (string): 觀光局檔案更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  SrcUpdateTime: string
  //  (string): 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

export interface IRestaurantTourismInfo {
  //  (String): 餐飲店家代碼 ,
  ID: string
  //  (String, optional): 餐飲店家名稱 ,
  Name?: string
  //  (String, optional): 店家簡述 ,
  Description?: string
  //  (String, optional): 店家地址 ,
  Address?: string
  //  (String, optional): 郵遞區號 ,
  ZipCode?: string
  //  (String, optional): 預約電話 ,
  Phone?: string
  //  (String, optional): 營業時間 ,
  OpenTime?: string
  //  (String, optional): 店家網站網址 ,
  WebsiteUrl?: string
  //  (TourismPicture, optional): 店家照片 ,
  Picture?: TourismPicture
  //  (PointType, optional): 店家位置 ,
  Position?: Point
  //  (String, optional): 店家分類 ,
  Class?: string
  //  (String, optional): 店家地圖/簡圖介紹網址 ,
  MapUrl?: string
  //  (String, optional): 停車資訊 ,
  ParkingInfo?: string
  //  (String, optional): 所屬縣市 ,
  City?: string
  //  (string): 觀光局檔案更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  SrcUpdateTime: string
  //  (string): 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

export interface IHotelTourismInfo {
  //  (String): 旅館民宿代碼 ,
  ID: string
  //  (String, optional): 旅館民宿名稱 ,
  Name?: string
  //  (String, optional): 旅館民宿簡述 ,
  Description?: string
  //  (String, optional): 觀光旅館星級 ,
  Grade?: string
  //  (String, optional): 旅館民宿地址 ,
  Address?: string
  //  (String, optional): 郵遞區號 ,
  ZipCode?: string
  //  (String, optional): 旅館民宿電話 ,
  Phone?: string
  //  (String, optional): 旅館民宿傳真 ,
  Fax?: string
  //  (String, optional): 旅館民宿網站網址 ,
  WebsiteUrl?: string
  //  (TourismPicture, optional): 旅館民宿照片 ,
  Picture?: TourismPicture
  //  (PointType, optional): 旅館民宿位置 ,
  Position?: Point
  //  (String, optional): 旅館民宿分類 ,
  Class?: string
  //  (String, optional): 旅館民宿地點簡圖連結網址 ,
  MapUrl?: string
  //  (String, optional): 房型、價目及數量說明 ,
  Spec?: string
  //  (String, optional): 服務內容介紹 ,
  ServiceInfo?: string
  //  (String, optional): 停車資訊 ,
  ParkingInfo?: string
  //  (String, optional): 所屬縣市 ,
  City?: string
  //  (DateTime): 觀光局檔案更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz) ,
  SrcUpdateTime: string
  //  (DateTime): 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

export type TourismPicture = {
  [key: string]: string | undefined
  // 照片連結網址1
  PictureUrl1?: string
  // 照片說明1
  PictureDescription1?: string
  // 照片連結網址2
  PictureUrl2?: string
  // 照片說明2
  PictureDescription2?: string
  // 照片連結網址3
  PictureUrl3?: string
  // 照片說明3
  PictureDescription3?: string
}

export type Point = {
  // (number, optional): 位置經度(WGS84)
  PositionLon?: number
  // (number, optional): 位置緯度(WGS84)
  PositionLat?: number
  // (String, optional): 地理空間編碼
  GeoHash?: string
}

export interface IRoute<T> {
  TaiwanTripName: T
  DepartureStopNameZh?: string
  DestinationStopNameZh?: string
}

export interface IBusEstimateTime {
  //  (String, optional): 車牌號碼 ,
  PlateNumb?: string
  //  (String, optional): 站牌唯一識別代碼，規則為 {業管機關代碼} + {StopID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  StopUID?: string
  //  (Int32): 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Direction: number
  //  (integer, optional): 到站時間預估(秒)
  EstimateTime?: number
  //  (integer, optional): 車輛距離本站站數
  StopCountDown?: number
  //  (String, optional): 車輛目前所在站牌代碼
  CurrentStop?: string
  //  (String, optional): 車輛目的站牌代碼
  DestinationStop?: string
  //  (Int32, optional): 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運']
  StopStatus?: number
  //  (string, optional): 下一班公車到達時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  NextBusTime?: string
  //  (DateTime): 本平台資料更新時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

export interface IBusStopOfRoute<T> {
  //  (String): 路線唯一識別代碼，規則為 {業管機關代碼} + {RouteID}，其中 {業管機關代碼} 可於Authority API中的AuthorityCode欄位查詢
  RouteUID: string
  //  (NameType): 台灣好行路線名稱
  TaiwanTripName: T
  //  (Int32): 去返程 : [0:'去程',1:'返程',2:'迴圈',255:'未知']
  Direction: number
  //  (Array[Stop]): 所有經過站牌
  Stops: TStop<T>[]
  //  (DateTime): 資料更新日期時間(ISO8601格式:yyyy-MM-ddTHH:mm:sszzz)
  UpdateTime: string
}

export type TStop<T> = {
  // (String): 站牌唯一識別代碼，規則為 {業管機關簡碼} + {StopID}，其中 {業管機關簡碼} 可於Authority API中的AuthorityCode欄位查詢
  StopUID: string 
  // (String): 地區既用中之站牌代碼(為原資料內碼)
  StopID: string 
  // (NameType): 站牌名稱
  StopName: T 
  // (Int32, optional): 上下車站別 : [-1:'可下車',0:'可上下車',1:'可上車'] ,
  StopBoarding?: number 
  // (Int32): 路線經過站牌之順序
  StopSequence: number 
  // (PointType): 站牌位置
  StopPosition: PointType 
  // (String, optional): 站牌所屬的站位ID
  StationID: string 
  // (String): 站牌所屬的組站位ID
  StationGroupID: string 
  // (String, optional): 站牌位置縣市之代碼(國際ISO 3166-2 三碼城市代碼)[若為公路/國道客運路線則為空值]
  LocationCityCode: string 
}

export type NameType = {
  Zh_tw?: string
  En?: string
}

export type PointType = {
  PositionLon?: number
  PositionLat?: number
  GeoHash?: string
}