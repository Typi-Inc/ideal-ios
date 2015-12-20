import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// import {oxpenAnimation} from './animations'
import TabApp from './tab-app'
import Tabs from './tabs'
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  View,
  ScrollView,
  TabBarIOS,
  NavigatorIOS,
  StatusBarIOS,
} = React;
export default class App extends React.Component{
	state={}
	
	render(){
		StatusBarIOS.setStyle('light-content');

		return (
			<View style={{flex:1,backgroundColor:'e8e8ee'}}>
				<View ref='status' style={{height:20,backgroundColor:'#0679a2', }}/>

				<Tabs ref={el=>this.tabs=el}/>
			</View>
			)
	}


}

Object.assign(App.prototype, TimerMixin);


				   
