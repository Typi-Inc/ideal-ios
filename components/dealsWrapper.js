import React from 'react-native'
import Deal from './deal'
// import {data} from './ mock'
import {openAnimation,closeImageAnimation} from './animations'
import TimerMixin from 'react-timer-mixin'
import Navbar from './navbar'
import Spinner from 'react-native-spinkit';
import Deals from './deals'
import _ from 'lodash'
let EventEmitter = require('EventEmitter');
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  View,
  ScrollView,
  StatusBarIOS,
  InteractionManager
} = React;

export default class DealsWrapper extends React.Component{
	render(){
		return (
			<Deals {...this.props} />
		)

	}
} 


Object.assign(DealsWrapper.prototype, TimerMixin);


