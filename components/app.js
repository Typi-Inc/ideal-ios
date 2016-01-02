import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// import {oxpenAnimation} from './animations'
import Tabs from './tabs'
import Combinator from './combinator'
import FindTab from './findTab'
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
var store = require('react-native-simple-store');

export default class App extends React.Component{
	state={}
	static childContextTypes={state$:React.PropTypes.any}
	getChildContext(){
		return {state$: this.props.state$}
	}
	componentWillMount(){
		// store.delete('Auth0Token').then(()=>{
		// 	store.get('Auth0Token').then(res=>{
		// 		console.log(res)
		// 		if(res){
		// 			this.authToken=res
		// 		}
		// 	})
		// })
		
	}
	render(){
		StatusBarIOS.setStyle('light-content');
		// if(this.authToken){
		// 	return 
		// }
		return (
				<View style={{flex:1,backgroundColor:'e8e8ee'}}>
					<View ref='status' style={{height:20,backgroundColor:'#0679a2', }}/>
				
					<Tabs state$={this.props.state$} ref={el=>this.tabs=el}/>
					
				</View>
			)
	}


}

Object.assign(App.prototype, TimerMixin);


				   
