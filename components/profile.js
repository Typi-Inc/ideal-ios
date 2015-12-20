import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,scrollToTopAnimation,closeImageAnimation} from './animations'
import {profile,data} from './mock'
import Lenta from './lenta'
import Deals from './deals'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  StatusBarIOS,
  LayoutAnimation,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  DeviceEventEmitter,
  ScrollView
} = React;
export default class Profile extends React.Component{
	state={};
	viewDeals(category){
		this.update=false
		this.props.navigator.push({
			component:Deals,
			passProps:{data:data,navigator:this.props.navigator,title:category,navbar:true}
		})
		this.setTimeout(()=>{this.update=true},200)
	}
	scrollToPosition(s){
		console.log(s)
		this.refs['scroll'].scrollTo(s,0)
		this.refs['nav'].setNativeProps({style:{height:0}})
	}
	shouldComponentUpdate(p,s){
		return this.update
	}
	componentDidMount(){
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
	}
	render(){
		// console.log('render profile ',this.state)
		this.update=this.update || true
		return (

		<View style={{flex:1,backgroundColor:'e8e8ee'}}>
			
			<ScrollView ref='scroll' contentContainerStyle={{marginTop:0}}>
				<View style={{backgroundColor:'white'}}>
					<View style={{flexDirection:'row',margin:8*k}}>
						<Image source={{uri:profile.uri}} style={{flex:1,width:80*k,height:80*k}}/>
						<View style={{flex:3,marginLeft:8*k}}>
							<Text style={{fontSize:16,fontWeight:'700'}}>{profile.name}</Text>
							<Text style={{fontSize:12,fontWeight:'500',color:'gray'}}>{profile.username}</Text>
							<Text style={{marginTop:30*k,}}>
								<Text style={{fontSize:12,fontWeight:'500',color:'gray'}}>Ваш баланс: </Text>
								<Text style={{fontSize:14,fontWeight:'700',color:'black'}}>{profile.balance} тг</Text>

							</Text>
						</View>
					</View>
					<View style={{...separator}}/>
					<View style={{flexDirection:'row',margin:8*k}}>
						<TouchableOpacity onPress={this.viewDeals.bind(this,'Продажи')}  style={{flex:1,margin:4*k}}>
							<View style={{flex:1,margin:4*k}}>
								<Text style={{fontSize:24,fontWeight:'600',color:'0679a2'}}>{profile.salesCount}</Text>
								<Text style={{fontSize:12*k,fontWeight:'500'}}>Продаж</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity  onPress={this.viewDeals.bind(this,'Покупки')}   style={{flex:1,margin:4*k}}>
							<View style={{flex:1,margin:4*k}}>
								<Text style={{fontSize:24,fontWeight:'600',color:'0679a2'}}>{profile.buysCount}</Text>
								<Text style={{fontSize:12*k,fontWeight:'500'}}>Покупок</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.viewDeals.bind(this,'Likes')}   style={{flex:1,margin:4*k}}>
							<View style={{flex:1,margin:4*k}}>
								<Text style={{fontSize:24,fontWeight:'600',color:'0679a2'}}>{profile.likesCount}</Text>
								<Text style={{fontSize:12*k,fontWeight:'500'}}>Likes</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.viewDeals.bind(this,'Referrals')}   style={{flex:1,margin:4*k}}>
							<View style={{flex:1,margin:4*k}}>
								<Text style={{fontSize:24,fontWeight:'600',color:'0679a2'}}>{profile.referralsCount}</Text>
								<Text style={{fontSize:12*k,fontWeight:'500'}}>Referrals</Text>
							</View>
						</TouchableOpacity>
					</View>


				</View>

				<Lenta scrollToPosition={this.scrollToPosition.bind(this)} navigator={this.props.navigator} viewDeals={this.viewDeals.bind(this,'   Likes')}  category={'Likes'}/>
				<Lenta scrollToPosition={this.scrollToPosition.bind(this)} navigator={this.props.navigator} viewDeals={this.viewDeals.bind(this,'Referrals')}   category={'Referrals'}/>
				<Lenta scrollToPosition={this.scrollToPosition.bind(this)} navigator={this.props.navigator}  viewDeals={this.viewDeals.bind(this,'Продажи')}  category={'Продажи'}/>
				<Lenta scrollToPosition={this.scrollToPosition.bind(this)} navigator={this.props.navigator} viewDeals={this.viewDeals.bind(this,'Покупки')}  category={'Покупки'}/>


			</ScrollView>

		</View>
					)

	}
}
Object.assign(Profile.prototype, TimerMixin);
