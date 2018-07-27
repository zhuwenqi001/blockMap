import React, {
	Component
} from 'react'
import {
	Map,
	Marker,
	InfoWindow
} from 'react-amap'
import {
	event
} from './eventEmitter'
import {
	_fetch
} from './_fetch'

class BaseMap extends Component {
	constructor() {
		super();
		this.state = {
			query: '',
			targetTitle: '',
			targetPos: {},
			targetCont: {},
			infowindowVisible: false
		}
		//地图初始信息
		this.mapOptions = {
			key: 'b22653ba2c2dba764dfebc7ced57dcd9',
			center: {
				longitude: 114.30553899999995,
				latitude: 30.592849
			},
			zoom: 10,
			plugins: ['ToolBar'],
			markerEvents: {
				click: (e) => {
					//更新state
					const pos = {};
					pos.longitude = e.lnglat.lng;
					pos.latitude = e.lnglat.lat;
					this.handleMarkerClick(e.target.F.extData, pos);
				}
			},
			infowindow: {
				size: {
					width: 200,
					height: 150
				},
				offset: [0, 0],
				windowEvents: {
					close: () => {
						this.setState(state => ({
							targetTitle: '',
							targetPos: {},
							infowindowVisible: !this.state.infowindowVisible
						}))
					}
				}
			}

		}

		//经过筛选的markers数据获取
		this.showmarkers = [];

		//订阅MarkerFilter.js 发布事件：updateMarkersData、choseMarker
		//updateMarkersData事件 获取筛选markers
		this.recieveMarkers = (query, data) => {
			this.setState({
				query: query
			})
			this.showmarkers = data;
		}
		this.handleMarkerClick = (title, pos) => {
			this.setState(state => ({
				targetTitle: title,
				targetPos: pos,
				infowindowVisible: true,
				targetCont: {}
			}));
			this.getWikiData(title)
		}
		event.on('updateMarkersData', this.recieveMarkers)
		event.on('choseMarker', this.handleMarkerClick)


		//获取维基百科数据 
		//参考 https://blog.csdn.net/qq_32623363/article/details/76785368
		this.getWikiData = (name) => {
			_fetch(fetch(`https://zh.wikipedia.org/w/api.php?action=query&list=search&srsearch=${name}&prop=info&inprop=url&utf8=&format=json&origin=*`, {
					method: 'GET',
					headers: new Headers({
						'Api-User-Agent': 'Example/1.0'
					})
				}), 5000)
				//resolve
				.then(function(response) {
					//请求成功 返回HTTP状态码
					if (response.ok) {
						return response.json();
					}
					//请求状态码为404 或者500
					this.setState(state => ({
						targetCont: {
							errorinfo: `${response.statusText}错误！`
						}
					}))
					throw new Error('Network response was not ok: ' + response.statusText);
				})
				.then(data => {
					this.setState(state => ({
						targetCont: {
							title: data.query.search[0].title,
							intro: data.query.search[0].snippet
						}
					}))
				})
				//网络故障、请求被阻 reject
				.catch(error => {
					this.setState(state => ({
						targetCont: {
							errorinfo: '网络连接错误！'
						}
					}))
				})
		}
	}

	render() {
		const {
			markers
		} = this.props;
		const mapOptions = this.mapOptions;
		const {
			query,
			targetTitle,
			targetPos,
			targetCont,
			infowindowVisible
		} = this.state;
		let infowinCont;
		//请求中 为空对象 loading 
		//维基百科 数据请求错误 存在errorinfo属性
		if (Object.keys(targetCont).length) {
			if ('errorinfo' in targetCont) {
				infowinCont =
					`<div class="infowindow">
						<h1>${targetTitle}</h1>
						<h2>维基百科数据请求失败！</h2>
						<p>失败原因：${targetCont.errorinfo}</p>
					</div>`
			} else {
				console.log(targetCont.title)
				infowinCont =
					`<div class="infowindow">
						<h1>${targetTitle}</h1>
						<h2>维基百科：<a href='https://zh.wikipedia.org/wiki/${targetCont.title}' target='_blank'>${targetCont.title}</a></h2>
						<p>简介：${targetCont.intro}</p>
					</div>`
			}
		} else {
			infowinCont = '<div class="infowindow"><div class="loading"></div></div>'
		}

		let showmarkersCopy = markers;
		if (query) {
			showmarkersCopy = this.showmarkers;
		}
		return (
			<Map 
				amapkey={mapOptions.key}
				zoom={mapOptions.zoom}
				center={mapOptions.center}
				plugins={mapOptions.plugins}
			>
            {showmarkersCopy.map(item=>(
              	<Marker
	              	position={item.pos}
	              	key={item.id}
	              	extData={item.name}
	              	events={mapOptions.markerEvents}
              	/>
           	))}
              <InfoWindow
              		position={targetPos}
					visible={infowindowVisible}
              		content={infowinCont}
              		size={mapOptions.infowindow.size}
              		events={mapOptions.infowindow.windowEvents}
              	/>
          </Map>
		)
	}
}

export default BaseMap;