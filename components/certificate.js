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
			<View style={{flexDirection:'row',backgroundColor:'white',alignItems:'center',justifyContent:'space-between'}}>
			<View style={{width:170*k,alignItems:'flex-start',marginTop:6*k,marginBottom:6*k,marginLeft:5*k}}>
				<Text style={{marginLeft:5*k,fontSize:12,
					fontWeight:'400',color:'black',width:190*k,
					textAlign:'auto'}}>
					{certificate.title}
				</Text>
				<View style={{flex:1,flexDirection:'row',...center,marginLeft:10*k,marginTop:6*k}}>
					<Text style={{textDecorationLine:'line-through',fontWeight:'600',fontSize:14*k,color:'gray',textDecorationColor:'red'}}>{certificate.oldPrice}  </Text>
					<Text style={{fontSize:16*k,fontWeight:'600',}}>{certificate.newPrice}</Text>
				</View>
				
			</View>
			<View style={{flexDirection:'row',...center,marginRight:10*k}}>
				<TouchableOpacity style={{height:80,...center}}>
					<View style={{backgroundColor:'gray',width:40*k,height:40*k,...center,borderRadius:3*k}}>
						<Image source={{uri:'minusWhite',isStatic:true}} style={{width:14*k,height:3*k}}/>
					</View>
				</TouchableOpacity>
				<Text style={{margin:5*k}}>22</Text>
				<TouchableOpacity style={{height:80,...center}}>
					<View style={{backgroundColor:'#00b484',width:40*k,height:40*k,...center,borderRadius:3*k}}>
						<Image source={{uri:'plusWhite',isStatic:true}} style={{width:14*k,height:14*k}}/>

					</View>
				</TouchableOpacity>

			</View>


		</View>



     		)
	}
}
Object.assign(Certificate.prototype, TimerMixin);

//<View style={{flex:1,flexDirection:'row',...center,marginLeft:10*k,marginTop:6*k}}>
//						<Text style={{textDecorationLine:'line-through',fontSize:12*k,color:'gray',textDecorationColor:'red'}}>{certificate.oldPrice}  </Text>
//						<Text style={{fontSize:15*k,fontWeight:'600',}}>{certificate.newPrice}</Text>
//					</View>
