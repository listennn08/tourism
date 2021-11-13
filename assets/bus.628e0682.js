var $=Object.defineProperty,j=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var A=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var Z=(e,a,s)=>a in e?$(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,N=(e,a)=>{for(var s in a||(a={}))q.call(a,s)&&Z(e,s,a[s]);if(A)for(var s of A(a))M.call(a,s)&&Z(e,s,a[s]);return e},T=(e,a)=>j(e,O(a));import{r as w,m as k,d as J,i as z,o as l,c as d,a as r,e as B,u as i,n as g,C as F,t as y,h as U,F as V,f as H,y as I,H as L,I as P}from"./vendor.51d29595.js";import{g as G,e as K,f as Q,h as W,i as X}from"./index.7c8535b4.js";function Y(){const e=w({City:"",CityCode:"",CityID:"",CityName:"",CountyID:""}),a=t=>{!t||(e.City=t.City,e.CityCode=t.CityCode,e.CityID=t.CityID,e.CityName=t.CityName,e.CountyID=t.CountyID,h())},s=w([]),S=k(),h=async()=>{clearInterval(S.value),c.TaiwanTripName="",c.DepartureStopNameZh="",c.DestinationStopNameZh="",s.splice(0,s.length);const t=(await G({select:"TaiwanTripName,DepartureStopNameZh,DestinationStopNameZh",filter:`City eq '${e.City}'`})).data.map(u=>T(N({},u),{TaiwanTripName:u.TaiwanTripName.Zh_tw}));s.push(...t),o.splice(0,o.length)},c=w({TaiwanTripName:"",DepartureStopNameZh:"",DestinationStopNameZh:""}),x=t=>{c.TaiwanTripName=t.TaiwanTripName,c.DepartureStopNameZh=t.DepartureStopNameZh,c.DestinationStopNameZh=t.DestinationStopNameZh,C(),S.value=setInterval(()=>C(),15e3)},o=w([]),C=async()=>{o.splice(0,o.length);const t=(await K(c.TaiwanTripName,{select:"RouteUID,Direction,Stops,UpdateTime"})).data.map(p=>T(N({},p),{Stops:p.Stops.map(m=>T(N({},m),{StopName:m.StopName.Zh_tw})).sort((m,n)=>m.StopSequence-n.StopSequence)}));o.push(...t);const u=await v();for(let p=0;p<o.length;p+=1)o[p].Stops=o[p].Stops.map(m=>{const n=JSON.parse(JSON.stringify(m)),_=u.find(f=>m.StopUID===f.StopUID);return _&&(n.timeInfo?n.timeInfo.push(_):n.timeInfo=[_]),n})},D=k(0),v=async()=>(await Q(c.TaiwanTripName,{select:"PlateNumb,StopUID,CurrentStop,Direction,EstimateTime,StopCountDown,DestinationStop,StopStatus,NextBusTime,UpdateTime"})).data;return{selectedCity:e,setSelectedCity:a,routeData:s,selectedRoute:c,setSelectedRoute:x,direction:D,stops:o}}const ee=e=>(L("data-v-39dbbe94"),e=e(),P(),e),te={class:"header"},se={class:"header-container custom-shadow"},ae={class:"header-content"},oe={class:"flex items-center justify-center mb-10"},ne={class:"flex min-h-13"},ie={href:"#",class:"route-btn"},re=I(" \u5F80 "),ue={class:"text-primary ml-2"},ce=I(" \u5F80 "),pe={class:"text-primary ml-2"},me={class:"mt-45 pb-20"},le=ee(()=>r("p",{class:"text-primary mb-3 text-right px-2 md:px-0"}," \u6BCF\u9694 15 \u79D2\u66F4\u65B0\u4E00\u6B21 ",-1)),de={class:"bg-white pt-4 md:py-13 px-2 md:px-14 min-h-screen"},he={key:0},_e={class:"time-list"},ye={class:"mr-2"},Se={key:1,class:"border rounded border-gray text-gray px-4 py-2"},Ce={key:1,class:"text-2xl text-gray"},De=J({setup(e){const a=z("cityOptions"),{selectedCity:s,setSelectedCity:S,selectedRoute:h,setSelectedRoute:c,routeData:x,direction:o,stops:C}=Y(),D=t=>{if(typeof t=="number"){const u=Math.floor(t/60);return u<3?"\u9032\u7AD9\u4E2D":`${u} \u5206\u9418`}return null},v=t=>{switch(t){case 1:return"\u5C1A\u672A\u767C\u8ECA";case 2:return"\u4EA4\u7BA1\u4E0D\u505C\u9760";case 3:return"\u672B\u73ED\u8ECA\u5DF2\u904E";case 4:return"\u4ECA\u65E5\u672A\u71DF\u904B";default:return null}};return(t,u)=>{var m;const p=X;return l(),d(V,null,[r("section",te,[r("div",se,[r("div",ae,[r("div",oe,[B(p,{value:i(s),options:i(a),change:i(S),class:"w-1/2 mx-1",placeholder:"\u9078\u64C7\u7E23\u5E02",text:"CityName",keyValue:"City"},null,8,["value","options","change"]),B(p,{value:i(h),options:i(x),change:i(c),class:"w-1/2 mx-1",placeholder:"\u9078\u64C7\u8DEF\u7DDA",text:"TaiwanTripName",keyValue:"TaiwanTripName"},null,8,["value","options","change"])]),r("div",ne,[i(h).TaiwanTripName?(l(),d("div",{key:0,class:g(["route-btn-container",{active:i(o)===0}]),onClick:u[0]||(u[0]=F(n=>o.value=0,["prevent"]))},[r("a",ie,[re,r("span",ue,y(i(h).DepartureStopNameZh),1)])],2)):U("",!0),i(h).TaiwanTripName?(l(),d("div",{key:1,class:g(["route-btn-container",{active:i(o)===1}])},[r("a",{href:"#",class:"route-btn",onClick:u[1]||(u[1]=F(n=>o.value=1,["prevent"]))},[ce,r("span",pe,y(i(h).DestinationStopNameZh),1)])],2)):U("",!0)])])])]),r("section",me,[le,r("div",de,[i(h).TaiwanTripName?(l(),d("div",he,[r("ul",_e,[(l(!0),d(V,null,H((m=i(C)[i(o)])==null?void 0:m.Stops,(n,_)=>{var f,b,E,R;return l(),d("li",{key:`${n.StopUID}${_}`,class:"flex items-center my-5 pl-10"},[r("div",ye,[((f=n.timeInfo)==null?void 0:f[0].StopStatus)===0?(l(),d("span",{key:0,class:g(["w-10 border rounded px-6 py-2",{"bg-primary text-white border-transparent":D((b=n.timeInfo)==null?void 0:b[0].EstimateTime)==="\u9032\u7AD9\u4E2D"}])},y(D((E=n.timeInfo)==null?void 0:E[0].EstimateTime)),3)):(l(),d("span",Se,y(v((R=n.timeInfo)==null?void 0:R[0].StopStatus)),1))]),I(" "+y(n.StopName),1)])}),128))])])):(l(),d("span",Ce,"\u8ACB\u9078\u64C7\u516C\u8ECA\u8DEF\u7DDA"))])])],64)}}});var we=W(De,[["__scopeId","data-v-39dbbe94"]]);export{we as default};