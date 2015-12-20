import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Image
} = React;
export default class Payout extends React.Component{
	state={count:0}
	plus(){

	}
	minus(){

	}
	render(){
		return (
		<View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',justifyContent:'space-between'}}>
			
		</View>
     		)
	}
}
Object.assign(Payout.prototype, TimerMixin);


