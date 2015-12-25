import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// import {oxpenAnimation} from './animations'
import Tabs from './tabs'
import {openAnimation} from './animations'
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableWithoutFeedback

} = React;
export default class Link extends React.Component{
	state={}
	render(){
			
		return (
		
			<View>

				<Text>hello</Text>


			</View>




		)	

	}

}

Object.assign(Link.prototype, TimerMixin);


				   
