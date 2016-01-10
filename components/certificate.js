import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  TouchableWithoutFeedback,
  Image
} = React;
export default class Certificate extends React.Component{
	state={count:0}
	plus(){

	}
	minus(){

	}
	render(){
		let certificate=this.props.certificate
		return (

				<View>
					<View style={{flexDirection:'row',marginTop:10,marginBottom:7*k}}>
						<Text style={{marginLeft:8*k,fontSize:13*k,flex:3,
							color:'black',
							textAlign:'auto'}}>
							{certificate.title}
						</Text>
						<Text style={{fontSize:14*k,marginLeft:20*k,flex:1,fontWeight:'400',fontFamily:'Monaco'}}>{certificate.newPrice}<Text style={{fontSize:14,color:'black'}}> тг</Text></Text>
					</View>

					<View style={{flexDirection:'row',...center,width:200*k,height:25*k,borderRadius:3*k,borderWidth:1,alignSelf:'center',borderColor:'#bbbbbb'}}>
						<TouchableOpacity style={{flex:2,...center,height:35*k,backgroundColor:'transparent'}}>
							<Text style={{fontSize:15*k,fontWeight:'500',color:'black'}}>-</Text>
						</TouchableOpacity>

						<View style={{height:25*k,width:1,backgroundColor:'#bbbbbb'}}/>
						<Text style={{flex:1,marginLeft:21*k,alignSelf:'center'}}>30</Text>
						<View style={{height:25*k,width:1,backgroundColor:'#bbbbbb'}}/>


						<TouchableOpacity style={{flex:2,...center,height:35*k,backgroundColor:'transparent'}}>
							<Text style={{fontSize:15*k,fontWeight:'500',color:'#0679a2'}}>+</Text>
						</TouchableOpacity>


					</View>

					
					<View style={{height:10*k}}/>

				</View>

				


     		)
	}
}
Object.assign(Certificate.prototype, TimerMixin);

//<View style={{flex:1,flexDirection:'row',...center,marginLeft:10*k,marginTop:6*k}}>
//						<Text style={{textDecorationLine:'line-through',fontSize:12*k,color:'gray',textDecorationColor:'red'}}>{certificate.oldPrice}  </Text>
//						<Text style={{fontSize:15*k,fontWeight:'600',}}>{certificate.newPrice}</Text>
//					</View>
