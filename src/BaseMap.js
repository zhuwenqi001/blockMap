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

class BaseMap extends Component {
	constructor() {
		super();
		this.state = {
			query: '',
			infowindowPos: {},
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
					//更新state坐标
					const pos = {};
					pos.longitude = e.lnglat.lng;
					pos.latitude = e.lnglat.lat;
					this.setState(state => ({
						infowindowPos: pos,
						infowindowVisible: true
					}))
				}
			},
			infowindow: {
				size: {
					width: 200,
					height: 140
				},
				offset: [0, 0],
				windowEvents: {
					close: () => {
						this.setState(state => ({
							infowindowPos: {},
							infowindowVisible: !this.state.infowindowVisible
						}))
					}
				}
			}

		}

		//经过筛选的markers数据获取
		this.showmarkers = [];
		//订阅MarkerFilter.js 发布的updateMarkersData事件 获取筛选markers
		this.recieveMarkers = (query, data) => {
			this.setState({
				query: query
			})
			this.showmarkers = data;
		}
		event.on('updateMarkersData', this.recieveMarkers)
	}


	render() {
		const {
			markers
		} = this.props;
		const mapOptions = this.mapOptions;
		const {
			query,
			infowindowPos,
			infowindowVisible
		} = this.state;
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
	              	events={mapOptions.markerEvents}
              	/>
           	))}
              <InfoWindow
              		position={infowindowPos}
					visible={infowindowVisible}
              		content='谢谢'
              		size={mapOptions.infowindow.size}
              		events={mapOptions.infowindow.windowEvents}
              	/>
          </Map>
		)
	}
}

export default BaseMap;