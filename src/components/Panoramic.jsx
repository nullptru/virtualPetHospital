import React, {Component} from 'react'
import scriptLoader from 'react-async-script-loader'
import '../css/panoramic.css'


class Panoramic extends Component {
    render() {
        return <div id="pano" style={{'width':'100%','height':'100%'}}></div>
    }
}

export default scriptLoader(
    'krpano.js',
    'actions.js',
    'main.js'
)(Panoramic)