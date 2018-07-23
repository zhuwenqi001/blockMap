import React, {
  Component
} from 'react'
import './App.css'
import BaseMap from './BaseMap'
import MarkerFilter from './MarkerFilter'

class App extends Component {
  constructor() {
    super();
    this.mapOptions = {
      key: 'b22653ba2c2dba764dfebc7ced57dcd9',
      center: {
        longitude: 114.30553899999995,
        latitude: 30.592849
      },
      zoom: 10
    };
    this.state = {
      markers: [{
        pos: {
          longitude: 114.36432190000005,
          latitude: 30.5360485
        },
        name: '武汉大学',
        id: '1'
      }, {
        pos: {
          longitude: 114.3614063,
          latitude: 30.5592465
        },
        name: '华中科技大学',
        id: '2'

      }, {
        pos: {
          longitude: 114.34248439999999,
          latitude: 30.5986568
        },
        name: '武汉理工大学',
        id: '3'

      }, {
        pos: {
          longitude: 114.36452859999997,
          latitude: 30.5179264
        },
        name: '华中师范大学',
        id: '4'

      }, {
        pos: {
          longitude: 114.33832159999997,
          latitude: 30.5169273
        },
        name: '武汉科技大学',
        id: '5'

      }]
    }
  }
  render() {
    return (
      <div className="container">
        <MarkerFilter markers={this.state.markers}/>
        <div className='map'><BaseMap mapOptions={this.mapOptions} markers={this.state.markers}/></div>
      </div>
    )
  }
}
export default App;