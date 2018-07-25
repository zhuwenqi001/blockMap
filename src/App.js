import React, {
  Component
} from 'react'
import './App.css'
import BaseMap from './BaseMap'
import MarkerFilter from './MarkerFilter'

class App extends Component {
  constructor() {
    super();
    //地图初始信息
    this.mapOptions = {
      key: 'b22653ba2c2dba764dfebc7ced57dcd9',
      center: {
        longitude: 114.30553899999995,
        latitude: 30.592849
      },
      zoom: 10
    }
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
          <BaseMap mapOptions={this.mapOptions} markers={this.state.markers}/>
        </div>
      </div>
    )
  }
}
export default App;