import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
let UIManager = require('NativeModules').UIManager;
import TabNavigator from 'react-native-tab-navigator';
import Deals from './deals'
import Deal from './deal'
import Profile from './profile'
import FindTab from './findTab'
import Navbar from './navbar'
import {data} from './mock'
import Parent from './parent'
import WatchedDealsContainer from './watchedDealsContainer'
import FindTabContainer from './findTabContainer'
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  Image,
  Navigator,
  View,
} = React;
// let ProfileRouteMapper={
// 	LeftButton:(route, navigator, index, navState)=>{
// 		if (index === 0) {
// 	 	 return null;
// 		}
// 		return (
// 			<TouchableOpacity  onPress={()=>navigator.pop()}>
// 					<Image  style={{height:16*k,width:12*k,marginLeft:10}} source={{uri:'arrowWhite',isStatic:true}}/>
// 			</TouchableOpacity>
// 			)

// 	},
// 	RightButton:(route, navigator, index, navState)=>{
// 		return null
// 	},
// 	Title:(route, navigator, index, navState)=>{
// 		return <Text  style={{color:'white',fontWeight:'700',fontSize:20}}>{route.name}</Text>
// 	}

// }
export default class Tabs extends React.Component{
	state={selectedTab:'notifications',height:45,overflow:'visible'}

  	static childContextTypes={toggleTabs:React.PropTypes.func}
	getChildContext(){
		return {toggleTabs: this.toggleTabs.bind(this)}
	}
  	toggleTabs(call){
  		this.setState({height:this.state.height>0?0:45,overflow:this.state.height>0?'hidden':'visible'},call)
  	}

  	renderHome(route,navigator){
  		return <WatchedDealsContainer />

  		// return <Deals route={route} data={data}/>
  	}
  	renderSearchTab(route,navigator){
  		return <FindTabContainer //searchedTags$={this.props.state$.pluck('tagsByText')}
  				/>
  	}
  	renderProfile(route,navigator){
  		// console.log(route)
  		if(route.name==='Deal'){
  			return <Deal deal={route.deal} isOpen={true} viewDeal={null} closeDeal={()=>navigator.pop()} pushedFromLenta={true}/>
  		}else{
  			return <Profile navigator={navigator}/>
  		}
  		
  	}
  	
	render(){

			console.log('rerender tab')
		return (
			<TabNavigator ref={el=>this.tabBar=el}
				tabBarStyle={{height:this.state.height,overflow:this.state.overflow}}
				 sceneStyle={{paddingBottom: this.state.height }}
			>
				  <TabNavigator.Item
				    selected={this.state.selectedTab === 'search'}
				    // title="Search"
				    renderIcon={() => <Image style={{height:20,width:20}} source={require('image!magnifying-glass32-8')} />}
				    renderSelectedIcon={() => <Image style={{height:20,width:20}} source={require('image!magnifying-glass32-7')}/>}
				    selectedTitleStyle={{color:'#0679a2',fontWeight:'600'}}
				    onPress={() =>this.setState({ selectedTab: 'search' })}>
 						<Navigator
							initialRoute={{name:'searchTab'}}
							renderScene={this.renderSearchTab.bind(this)}
						/>						

				  </TabNavigator.Item>

				  <TabNavigator.Item
				    selected={this.state.selectedTab === 'home'}
				    // title="Home"
				    renderIcon={() => <Image style={{height:23,width:23}} source={require('image!house204')} />}
				    renderSelectedIcon={() => <Image style={{height:23,width:23}} source={require('image!house58')}/>}
				    // badgeText="1"
				    selectedTitleStyle={{color:'#0679a2',fontWeight:'600'}}
				    onPress={() => this.setState({ selectedTab: 'home' })}>

				    <Navigator
							initialRoute={{name:'homeDeals'}}
							renderScene={this.renderHome.bind(this)}
						/>

				  </TabNavigator.Item>

				    <TabNavigator.Item
				    selected={this.state.selectedTab === 'notifications'}
				    // title="Activity"
				    renderIcon={() => <Image style={{height:20,width:20}} source={require('image!notification5')} />}
				    renderSelectedIcon={() => <Image style={{height:20,width:20}} source={require('image!notifications-2')}/>}
				    // badgeText="1"
				    selectedTitleStyle={{color:'#0679a2',fontWeight:'600'}}
				    onPress={() => this.setState({ selectedTab: 'notifications' })}>
				    <Parent/>
				  </TabNavigator.Item>

				    <TabNavigator.Item
				    selected={this.state.selectedTab === 'profile'}
				    // title="Profile"
				    renderIcon={() => <Image style={{height:22,width:22}} source={require('image!profile10')} />}
				    renderSelectedIcon={() => <Image style={{height:22,width:22}} source={require('image!users91')}/>}
				    // badgeText="1"
				    selectedTitleStyle={{color:'#0679a2',fontWeight:'600'}}
				    onPress={() => this.setState({ selectedTab: 'profile' })}>
 							<Navigator
							initialRoute={{name:'profile'}}
							// navigationBar={<Navigator.NavigationBar routeMapper={ProfileRouteMapper} style={{backgroundColor:this.props.blue?'white':'#0679a2'}}/>}
							renderScene={this.renderProfile.bind(this)}

						/>				
				  </TabNavigator.Item>
				</TabNavigator>
			)
	}


}

Object.assign(Tabs.prototype, TimerMixin);


				   
