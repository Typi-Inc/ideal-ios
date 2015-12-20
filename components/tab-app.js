import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deals from './deals'
import {openAnimation} from './animations'
import Profile from './profile'
import {data} from './mock'
import FindTab from './findTab'
import Address from './address'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  NavigatorIOS,
  TabBarIOS,
  StatusBarIOS,
  LayoutAnimation
} = React;
export default class TabApp extends React.Component{
	state={selectedTab:'featured'}
	componentDidMount(){
	}


	render(){
		return (
			<TabBarIOS selectedTab={this.state.selectedTab} tintColor={'#0679a2'} translucent={true}>
		        <TabBarIOS.Item
		          selected={this.state.selectedTab==='search'}
		          title='Search'
		          icon={{uri:"searchA",isStatic:true}}	          
		          onPress={() => {LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		          	this.setState({selectedTab: 'search'})}}>
		          	<View style={{paddingTop:0}}>
					<FindTab/>
					</View>        	
		        </TabBarIOS.Item>
	       		<TabBarIOS.Item
					selected={this.state.selectedTab==='featured'}
					title='Featured'
					icon={{uri:"starA",isStatic:true}}
					selectedIcon={{uri:"starBA",isStatic:true}}
					onPress={() => {this.setState({selectedTab: 'featured',})}}>			
			  			<NavigatorIOS style={{flex:1}} navigationBarHidden={true}
						    initialRoute={{
							component:Deals,
							passProps:{navbar:false, data:data, tabState:this.state.selectedTab}}}/>     	
		        </TabBarIOS.Item>
				 <TabBarIOS.Item
				  title='Activity'
				  selected={this.state.selectedTab==='notifications'}
				  icon={{uri:"notificationA",isStatic:true}}
				  selectedIcon={{uri:"notificationBA",isStatic:true}}
				  onPress={() => {this.setState({selectedTab: 'notifications' });}}>
				  		<Address/>        	

				</TabBarIOS.Item>
	            <TabBarIOS.Item
	              selected={this.state.selectedTab==='profile'} icon={{uri:"profileA",isStatic:true}}
		          selectedIcon={{uri:"profileBA",isStatic:true}} title='Profile' 
		          onPress={() => {this.setState({selectedTab: 'profile'})}}>
		          			<NavigatorIOS style={{flex:1}} navigationBarHidden={true}
						     initialRoute={{
						      component:Profile,
						      passProps:{hello:'how is it going'},
						     }}/>
			        </TabBarIOS.Item>
     		</TabBarIOS> 		
     		)
	}
}
Object.assign(TabApp.prototype, TimerMixin);


