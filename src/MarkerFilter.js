import React, {
	Component
} from 'react'
import EscapeRegExp from 'escape-string-regexp'
import {
	event
} from './eventEmitter'

class MarkerFilter extends Component {
	constructor() {
		super();
		this.state = {
			query: ''
		}
		this.showmarkers = [];
		this.updateQuery = (query, markers) => {
			query = query.trim()
			this.setState({
				query: query
			})
			if (query) {
				const match = new RegExp(EscapeRegExp(query), 'i');
				this.showmarkers = markers.filter((item) => match.test(item.name));
			}
			event.emit('updateMarkersData', query, this.showmarkers)
		}
		this.handleLiClick = (title, pos) => {
			event.emit('choseMarker', title, pos)
		}

	}

	render() {
		const {
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
			<div className="markerfilter">
				<h1>地址筛选</h1>
				<label for='filtermarker' class="visibleNone">名称搜索</label>
				<input 
				name='filtermarker'
				type='text'
				placeholder='名称搜索'
				value={this.state.query}
				onChange={(event)=>{this.updateQuery(event.target.value,markers)}}
				/>
				<ul>
					{showmarkersCopy.map(item=>(<li key={item.id} onClick={()=>{this.handleLiClick(item.name,item.pos)}}>{item.name}</li>))}
				</ul>
			</div>
		)
	}
}

export default MarkerFilter;