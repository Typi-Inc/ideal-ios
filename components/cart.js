import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import Certificate from './certificate'
import Loading from './loading'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  Animated,
  Image,
  View,
} = React;
export default class Cart extends React.Component{
	state={}

	static contextTypes={
    	state$: React.PropTypes.any
  	}
  	componentWillUnmount(){
  	}
	render(){
		return (
			<View style={{flex:1,backgroundColor:'white'}}>
				
			</View>		
 		)
		
	}
}
Object.assign(Cart.prototype, TimerMixin);




