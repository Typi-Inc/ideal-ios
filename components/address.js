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
			<View style={{flex:1,backgroundColor:'white',marginBottom:60,marginTop:10*k}}>
				<View style={{flexDirection:'row'}}>
					<View style={{flexDirection:'column'}}>
						<View style={{flexDirection:'row',...center,marginTop:10*k,paddingLeft:10*k}}>
							<Image source={{uri:'pin71',isStatic:true}} style={{width:20*k,height:20*k}}/>
							<Text style={{marginLeft:5*k,fontSize:13*k,color:'black',width:260*k,}}>г. Алматы, ул. Рихарда Зорге 18 возле ТРЦ МАРТ (Шолохова-Акан-сукры ленинская смена)</Text>
						</View>
						<View style={{flexDirection:'row',...center,marginTop:10*k,paddingLeft:14*k}}>
							<Image source={{uri:'clock100',isStatic:true}} style={{width:19*k,height:19*k}}/>
							<View style={{alignItems:'flex-start',justifyContent:'center',width:200*k}}>
								<Text style={{marginLeft:10*k,fontSize:13*k,color:'black'}}>пн-сб с 11:00 до 22:00</Text>
								<Text style={{marginLeft:10*k,fontSize:13*k,color:'black'}}>вс-ср с 11:00 до 23:00</Text>
								<Text style={{marginLeft:10*k,fontSize:13*k,color:'black'}}>ср-чт с 11:00 до 22:00</Text>
								<Text style={{marginLeft:10*k,fontSize:13*k,color:'black'}}>пн-сб с 11:00 до 22:00</Text>

							</View>
							<TouchableOpacity>
								<View style={{backgroundColor:'#0084b4',height:50*k,width:50*k,borderRadius:3*k,...center}}>
									<Image source={{uri:'telephone5',isStatic:true}} style={{width:20*k,height:20*k}}/>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<TouchableOpacity style={{alignSelf:'center',marginTop:10*k}}>
					<View style={{backgroundColor:'#0084b4',height:40*k,width:180*k,borderRadius:3*k,...center}}>
						<Text style={{color:'white',fontWeight:'500'}}>Посмотреть на карте</Text>
					</View>
				</TouchableOpacity>

				<View style={{marginTop:10*k,padding:10}}>
					<View style={{...separator}}/>
					<View style={{height:40*k,...center}}><Text style={{color:'#0679a2',fontWeight:'500',marginLeft:10*k,}}>УСЛОВИЯ И ОСОБЕННОСТИ</Text></View>


					<View style={{...separator}}/>

					{
						[1,2].map((key)=>{
							return <View key={key} style={{flexDirection:'row',...center,margin:10*k}}>
							<View style={{height:4*k,width:4*k,borderRadius:2*k,backgroundColor:'black',marginRight:5*k}}/>
								<View style={{width:290*k,marginLeft:5*k}}><Text style={{fontSize:13*k}}>Перед покупкой ознакомьтесь с правилами безопасности</Text></View>
							</View>
						})
					}
					<View style={{flexDirection:'row',...center,margin:10*k}}>
							<View style={{height:4*k,width:4*k,borderRadius:2*k,backgroundColor:'black',marginRight:5*k}}/>
								<View style={{width:290*k,marginLeft:5*k}}><Text style={{fontSize:13*k}}>Детям до 5 нельзя без сопровождения взрослых</Text></View>
							</View>

				</View>
			 </View>

			)
	}


}

Object.assign(Address.prototype, TimerMixin);

