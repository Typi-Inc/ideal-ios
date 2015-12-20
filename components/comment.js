import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
let {
  LayoutAnimation,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} = React;
export default class Comment extends React.Component{
	state={}
	
	render(){
		return (
		<View>
			<View style={{flexDirection:'row',marginTop:7*k}}>
				
				<Image style={{width:30*k,height:42*k,flex:1,margin:5*k}} source={{uri:this.props.comment.uri}}/>
				<View style={{flex:6,marginLeft:10*k,marginRight:7*k}}>
					<Text style={{fontSize:13*k,fontWeight:'bold'}}>{this.props.comment.author}</Text>
					<Text style={{fontSize:13*k,fontWeight:'400',marginTop:5*k}}>{this.props.comment.text}</Text>
					<Text style={{color:'gray',fontSize:10*k,fontWeight:'bold',marginTop:5*k}}>2 days ago</Text>
				</View>

			</View>	
			<View style={{height:1,backgroundColor:'e4e4e4',marginTop:5*k}}/>
		</View>
		)
	}
}
Object.assign(Comment.prototype, TimerMixin);

