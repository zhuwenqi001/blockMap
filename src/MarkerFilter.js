import React, {
	Component
} from 'react'

class MarkerFilter extends Component {
	constructor() {
		super();
		this.state = {
			query: ''
		}
	}

	render() {
		const {
			markers
		} = this.props;
		return (
			<div className="markerfilter">
				<h1>地址筛选</h1>
				<ul>
					{markers.map(item=>(<li key={item.id}>{item.name}</li>))}
				</ul>
			</div>
		)
	}
}

export default MarkerFilter;