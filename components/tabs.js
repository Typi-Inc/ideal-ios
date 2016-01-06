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
import Auth from './auth'
var Auth0Lock = require('react-native-lock-ios');
var lock = new Auth0Lock({clientId: 'TWpDN8HdEaplEXJYemOcNYSXi64oQmf8', domain: 'ideal.eu.auth0.com'});
import Parent from './parent'
import FeaturedDealsTab from './featuredDealsTab'
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  LinkingIOS,
  Image,
  Navigator,
  View,
} = React;
var Epay=require('react-native').NativeModules.Epay

// 	store.get('Auth0Token').then(token=>{
  // 		if(token && token.idToken.length>10){
  // 			return;
  // 		}
  // 		lock.show({}, (err, profile, token) => {
		// 	if (err) {
		// 		console.log(err);
		// 		return;
		// 	}
		// 	console.log(profile,'profile end','token start',token)
		// 	store.save('Auth0Token',{idToken:token.idToken}).then(res=>console.log(res))
		// 	// Authentication worked!
		// 	console.log('Logged in with Auth0!');
		// });
  // 	})

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

  	static childContextTypes={toggleTabs:React.PropTypes.func,goHome:React.PropTypes.func}
	getChildContext(){
		return {toggleTabs: this.toggleTabs.bind(this),
				goHome:this.goHome.bind(this)
			}
	}
	goHome(){
		this.setState({selectedTab:'search'})
	}
  	toggleTabs(val){
  		this.setState({height:val?0:45,overflow:val?'hidden':'visible'})
  	}

  	renderHome(route,navigator){
  		return (
  			<FeaturedDealsTab
  				featuredDeals$={this.props.state$.pluck('featuredDeals')} 
  				dealsById$={this.props.state$.pluck('dealsById')}
  			/>
  		)

  		// return <Deals route={route} data={data}/>
  	}
  	renderSearchTab(route,navigator){
  		return (<FindTab searchedTags$={this.props.state$.pluck('tagsByText')}
					chosenTags$={this.props.state$.pluck('chosenTags')}
					searchedDeals$={this.props.state$.pluck('dealsByTags')}
					dealsById$={this.props.state$.pluck('dealsById')}
					tagSearchText$={this.props.state$.pluck('tagSearchText')}
  				/>)
  	}
  	renderProfile(route,navigator){
  		if(route.name==='Deal'){
  			return <Deal deal={route.deal} isOpen={true} viewDeal={null} closeDeal={()=>navigator.pop()} pushedFromLenta={true}/>
  		}else{
  			return <Auth><Profile navigator={navigator}/></Auth>
  		}
  		
  	}
  	
	render(){
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
				    <View style={{backgroundColor:'blue',flex:1,...center}}>

				    	<TouchableOpacity onPress={()=>LinkingIOS.openURL(`whatsapp://send?text=https://www.whatsapp.com/\n\n\nhello isken how is going you are going to be spammed ❤️12,🔫 `)}>
				    		<View><Text>click me</Text></View>
				    	</TouchableOpacity>

				    	<TouchableOpacity onPress={()=>Epay.pay('fucky')}>
				    		<View><Text>pay</Text></View>
				    	</TouchableOpacity>

				    </View>
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


				   
