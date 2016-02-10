import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,scrollToTopAnimation,closeImageAnimation} from './animations'
import {profile,data} from './mock'
import Lenta from './lenta'
import Deals from './deals'
import Navbar from './navbar'
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
		// console.log(s)
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
			<Navbar navigator={this.props.navigator} backButton={true} title={'Профиль'}/>
			<View>
				<View style={{backgroundColor:'white'}}>
					<View style={{flexDirection:'row',margin:8*k}}>
						<Image source={{uri:profile.uri}} style={{flex:1,width:60*k,height:70*k,borderRadius:3*k}}/>
						<View style={{flex:3,marginLeft:8*k}}>
							<Text style={{fontSize:16,fontWeight:'700'}}>{profile.name}</Text>
							<TouchableOpacity><View style={{marginTop:10,height:35*k,...center,width:150,backgroundColor:'#00b484',borderRadius:3*k}}>
								<Text style={{color:'white',fontWeight:'bold'}}>Баланс: 212323 тг</Text>
							</View></TouchableOpacity>

						</View>
					</View>
					<View style={{...separator}}/>
				</View>

				<TouchableOpacity><View style={{backgroundColor:'white',marginTop:10,height:45*k,justifyContent:'center',padding:10}}><Text>Мои рекомендации: 22</Text></View></TouchableOpacity>
				<View style={{...separator}}/>
				<TouchableOpacity><View style={{backgroundColor:'white',height:45*k,justifyContent:'center',padding:10}}><Text>Мои продажи: 13</Text></View></TouchableOpacity>
				<View style={{...separator}}/>
				<TouchableOpacity><View style={{backgroundColor:'white',height:45*k,justifyContent:'center',padding:10}}><Text>Мои покупки: 4</Text></View></TouchableOpacity>
				<View style={{...separator}}/>
				<TouchableOpacity><View style={{backgroundColor:'white',height:45*k,justifyContent:'center',padding:10}}><Text>Лайки: 24</Text></View></TouchableOpacity>
				<View style={{...separator}}/>
				<TouchableOpacity><View style={{backgroundColor:'white',marginTop:10,height:45*k,justifyContent:'center',padding:10}}><Text>Снять деньги</Text></View></TouchableOpacity>
				<View style={{...separator}}/>
				<TouchableOpacity><View style={{backgroundColor:'white',height:45*k,justifyContent:'center',padding:10}}><Text>Пополнить баланс</Text></View></TouchableOpacity>
				<View style={{...separator}}/>
				<TouchableOpacity><View style={{backgroundColor:'white',marginTop:10,height:45*k,justifyContent:'center',padding:10}}><Text>Настройки</Text></View></TouchableOpacity>
				<View style={{...separator}}/>

			</View>

		</View>
					)

	}
}
Object.assign(Profile.prototype, TimerMixin);
