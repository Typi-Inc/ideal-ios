import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import {openAnimation} from './animations'
import Test from './test'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  Image,
  TouchableOpacity
} = React;
export default class DealAuthor extends React.Component{
	state={}
	render(){
		let name=this.props.business.name
		let factName=name.length>20 ? name.slice(0,20)+'...':name
		return (
		<View>
			<View style={{alignItems:'center',justifyContent:'space-between',flexDirection:'row',height: 50*k}}>
				<View style={{...center,flexDirection:'row'}}>
					<Image source={{uri:this.props.business.image}} style={{height:45*k,width:45*k,marginLeft:5*k}}/>
					<View>
						<Text style={{marginLeft:10*k,fontSize:14*k,fontWeight:'700'}}>{factName}</Text>
						<Text style={{marginLeft:10*k,fontSize:12,color:'gray',fontWeight:'700',marginTop:5}}>Осталось 3 дня</Text>
					</View>	
				</View>
					<TouchableOpacity style={{paddingTop:5*k,backgroundColor:'transparent',height:50*k,width:50*k,justifyContent:'flex-start',alignItems:'flex-end'}} onPress={()=>this.props.openHelper()}>
						<Image style={{height:35,width:24,marginRight:15,transform:[{rotate:'15deg'}]}} source={{uri:'Earn blue green',isStatic:'true'}}/>
					</TouchableOpacity>
			</View>
			<View style={{height:1,backgroundColor:'e4e4e4'}}/>
		</View>
     		)
	}
}
Object.assign(DealAuthor.prototype, TimerMixin);


