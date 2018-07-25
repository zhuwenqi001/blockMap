import React, {
	Component
} from 'react'
import {
	Map,
	Marker
} from 'react-amap'
import {
	event
} from './eventEmitter'

class BaseMap extends Component {
	constructor() {
		super();
		this.state = {
			query: ''
		}
		this.showmarkers = [];
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
			mapOptions,
			markers
		} = this.props;
		const {
			query
		} = this.state;
		let showmarkersCopy = markers;
		if (query) {
			showmarkersCopy = this.showmarkers;
		}
		return (
			<Map amapkey={mapOptions.key} zoom={mapOptions.zoom} center={mapOptions.center}>
              {showmarkersCopy.map(item=>(<Marker position={item.pos} key={item.id}/>))}
          </Map>
		)
	}
}

export default BaseMap;