import React, {
	Component
} from 'react'
import {
	Map,
	Marker
} from 'react-amap'

class BaseMap extends Component {

	render() {
		const {
			mapOptions,
			markers
		} = this.props;
		return (
			<Map amapkey={mapOptions.key} zoom={mapOptions.zoom} center={mapOptions.center}>
              {markers.map(item=>(<Marker position={item.pos} key={item.id}/>))}
          </Map>
		)
	}
}

export default BaseMap;