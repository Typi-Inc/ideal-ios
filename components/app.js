import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// import {oxpenAnimation} from './animations'
import Tabs from './tabs'
import Combinator from './combinator'
import FindTab from './findTab'
import Navbar from './navbar'
let UIManager = require('NativeModules').UIManager;
let {
  LayoutAnimation,
  Text,
  View,
  Navigator,
  StatusBarIOS,
} = React;
var store = require('react-native-simple-store');

export default class App extends React.Component{
	state={modalVisible:false}
	static childContextTypes={state$:React.PropTypes.any,}
	getChildContext(){
		return {state$: this.props.state$,}
	}
	componentWillMount(){
	}
	showModal(someProps){
		this.insideModal=someProps.component
		this.setState({modalVisible:true})
	}
	hideModal(){
		this.setState({modalVisible:false})
	}
	renderApp(route,navigator){
		// this.navigator=navigator
		// console.log('rendering app',this.navigator)

		if(route.name==='Other'){
			return <View style={{backgroundColor:'white',flex:1}}>
						<Navbar navigator={navigator} backButton={true} title={route.title}/>
							{route.component}
					</View>
		}
		return <Tabs topNav={navigator} ref={el=>this.tabs=el}/>
	}
	render(){
		StatusBarIOS.setStyle('light-content');
		// if(this.authToken){
		// 	return 
		// }
		return (
				<View style={{flex:1,backgroundColor:'#0679a2'}}>
					<View ref='status' style={{height:20,backgroundColor:'#0679a2', }}/>
					 <Navigator
					 		ref={el=>this.navigator=el}
							initialRoute={{name:'tabApp'}}
							renderScene={this.renderApp.bind(this)}
							configureScene={(route,routeStack)=>{
								if(route.name==='Other') return Navigator.SceneConfigs.FloatFromBottom
								return Navigator.SceneConfigs.FloatFromRight
							}}
						/>	
				</View>
			)
	}


}

Object.assign(App.prototype, TimerMixin);


				   
