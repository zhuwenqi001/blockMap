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
    //响应窗口变化 UI控制
    this.onWindowResize = () => {
      if (window.innerWidth <= 767 && this.state.isFilterShow === 'show') {
        //手机
        this.setState(state => ({
          isFilterShow: 'hide'
        }))
      } else if (window.innerWidth > 767 && this.state.isFilterShow === 'hide') {
        //大屏
        this.setState(state => ({
          isFilterShow: 'show'
        }))
      }
    }

  }
  //挂载
  componentDidMount() {
    //监听窗口变化
    window.addEventListener('resize', this.onWindowResize)
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
  //卸载
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
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