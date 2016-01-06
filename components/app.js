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
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  TabBarIOS,
  NavigatorIOS,
  StatusBarIOS,
} = React;
var store = require('react-native-simple-store');

export default class App extends React.Component{
	state={modalVisible:false}
	static childContextTypes={state$:React.PropTypes.any,showModal:React.PropTypes.func,hideModal:React.PropTypes.func}
	getChildContext(){
		return {state$: this.props.state$,showModal:this.showModal.bind(this),hideModal:this.hideModal.bind(this)}
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
	showModal(someProps){
		this.insideModal=someProps.component
		this.setState({modalVisible:true})
	}
	hideModal(){
		this.setState({modalVisible:false})
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
					 <Modal
				          animated={true}
				          // transparent={this.state.transparent}
				          visible={this.state.modalVisible}>
				          <View style={{marginTop:20}}>
				          	 <TouchableWithoutFeedback onPress={this.hideModal.bind(this)}>
				          	 	<Text>Закрыть</Text>
				          	 </TouchableWithoutFeedback>
				          </View>
				          {this.insideModal}
				     </Modal>
				</View>
			)
	}


}

Object.assign(App.prototype, TimerMixin);


				   
