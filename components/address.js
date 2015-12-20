import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
} = React;
import {openAnimation,scrollToTopAnimation,closeImageAnimation} from './animations'
export default class Address extends React.Component{
	state={}
	
	render(){
		return (

			<View style={{flex:1,backgroundColor:'white',marginBottom:400,marginTop:10*k}}>

				<View style={{flexDirection:'row'}}>
					<View style={{flexDirection:'column'}}>
						<View style={{flexDirection:'row',...center,marginTop:10*k,paddingLeft:10*k}}>
							<Image source={{uri:'pin71',isStatic:true}} style={{width:26*k,height:26*k}}/>
							<Text style={{marginLeft:5*k,fontSize:12,fontWeight:'600',color:'black',width:260*k,}}>г. Алматы, ул. Рихарда Зорге 18 возле ТРЦ МАРТ (Шолохова-Акан-сукры ленинская смена)</Text>

						</View>
						<View style={{flexDirection:'row',...center,marginTop:10*k,paddingLeft:14*k}}>
							<Image source={{uri:'clock100',isStatic:true}} style={{width:19*k,height:19*k}}/>
							<View style={{alignItems:'flex-start',justifyContent:'center',width:200*k}}>
								<Text style={{marginLeft:10*k,fontSize:12,fontWeight:'600',color:'black'}}>пн-сб с 11:00 до 22:00</Text>
								<Text style={{marginLeft:10*k,fontSize:12,fontWeight:'600',color:'black'}}>вс-ср с 11:00 до 23:00</Text>
								<Text style={{marginLeft:10*k,fontSize:12,fontWeight:'600',color:'black'}}>ср-чт с 11:00 до 22:00</Text>
								<Text style={{marginLeft:10*k,fontSize:12,fontWeight:'600',color:'black'}}>пн-сб с 11:00 до 22:00</Text>

							</View>
							<TouchableOpacity>
								<View style={{backgroundColor:'#0084b4',height:50*k,width:50*k,borderRadius:3*k,...center}}>
									<Image source={{uri:'telephone5',isStatic:true}} style={{width:26*k,height:26*k}}/>
								</View>
							</TouchableOpacity>

						</View>

					</View>



				</View>







				
			 </View>

			)
	}


}

Object.assign(Address.prototype, TimerMixin);

