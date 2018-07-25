import React, {
  Component
} from 'react'
import './App.css'
import BaseMap from './BaseMap'
import MarkerFilter from './MarkerFilter'

class App extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
      isFilterShow: 'show'
    }
    this.toggleControl = () => {
      this.setState(state => ({
        isFilterShow: (state.isFilterShow === 'show') ? 'hide' : 'show'
      }))
    }

  }
  componentDidMount() {
    //挂载后，加载数据
    fetch('./markers.json', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => res.json())
      .then(data => {
        this.setState(state => ({
          markers: data.markers
        }));
      });

  }
  render() {
    return (
      <div className={`container ${this.state.isFilterShow}`}>
      {/*标志点筛选*/}
        <MarkerFilter markers={this.state.markers}/>
      {/*包含切换按钮的地图*/}
        <div className='map'>
          <div className='topBar'>
              <button className='toggleFilter' onClick={this.toggleControl}>Navigation</button>
          </div>
        {/*基础地图*/}
          <BaseMap markers={this.state.markers}/>
        </div>
      </div>
    )
  }
}
export default App;