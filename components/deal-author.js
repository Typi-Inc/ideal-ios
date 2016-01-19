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
  TouchableOpacity,
  TouchableWithoutFeedback
} = React;
export default class DealAuthor extends React.Component{
	state={}
	render(){
		let name=this.props.business.get('name')
		let factName=name.length>20 ? name.slice(0,20)+'...':name
		return (
	<TouchableWithoutFeedback onPress={this.props.isOpen ? null:this.props.viewDeal}>
		<View>
			<View style={{alignItems:'center',justifyContent:'space-between',flexDirection:'row',height: 43*k}}>
				<View style={{...center,flexDirection:'row'}}>
					<Image source={{uri:this.props.business.get('image')}} style={{height:38*k,width:38*k,marginLeft:5*k}}/>
					<View>
						<Text style={{marginLeft:10*k,fontSize:14*k,fontWeight:'700'}}>{factName}</Text>
						<Text style={{marginLeft:10*k,fontSize:12,color:'gray',fontWeight:'700',marginTop:1}}>Осталось 3 дня</Text>
					</View>	
				</View>
					<TouchableOpacity style={{paddingTop:5*k,backgroundColor:'transparent',height:50*k,width:50*k,justifyContent:'flex-start',alignItems:'flex-end'}} onPress={()=>this.props.openHelper()}>
						<Image style={{height:35*k,width:24*k,marginRight:15,transform:[{rotate:'15deg'}]}} source={{uri:'Earn blue green',isStatic:'true'}}/>
					</TouchableOpacity>
			</View>
			<View style={{height:1,backgroundColor:'e4e4e4'}}/>
		</View>
	</TouchableWithoutFeedback>

     		)
	}
}

Object.assign(DealAuthor.prototype, TimerMixin);


