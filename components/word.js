import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,scrollToTopAnimation} from './animations'

let UIManager = require('NativeModules').UIManager;
let {
  LayoutAnimation,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  View,
  Animated,
  Image,
  ScrollView,
} = React;
export default class Word extends React.Component{
	state={isUp:this.props.isUp,canClick:true}
	choose(){
		// LayoutAnimation.configureNext(openAnimation)
		// this.setState({isUp:!this.state.isUp})
		this.props.chooseTag(this.props.tag)
	}
	cancel(){
		// LayoutAnimation.configureNext(openAnimation)
		
		if(this.props.city && this.props.city){
			return;
		}
		this.props.cancelTag(this.props.tag)
	}
	componentDidMount(){
		Animated.timing(this.anim,{toValue:1,duration:200}).start()
	}
	componentWillUpdate(){
		Animated.timing(this.anim,{toValue:1,duration:200}).start()
	}
	componentWillUnmount(){
		Animated.timing(this.anim,{toValue:0,duration:200}).start()
	}
	// componentWillReceiveProps(props){
	// 	if (props.cannotClick){
	// 		this.setState({canClick:false},()=>{
	// 			this.setTimeout(()=>{
	// 				this.setState({canClick:true})
	// 			},400)	
	// 		})
			
	// 	}
	// }

	render(){
		if(this.props.isUp){
			// console.log(this.props.tag)
		}
		this.anim = this.anim || new Animated.Value(0)	
		let tag=this.props.tag	
			return (
	 			<TouchableOpacity onPress={this.state.isUp?this.state.canClick?this.cancel.bind(this):null:this.choose.bind(this)}>	
	 				<Animated.View style={{flexDirection:'row',
	 				height:this.props.city && this.props.city?35*k:30*k,
	 				paddingLeft:5*k,
	 				paddingRight:5*k,
	 				marginLeft:7*k,
	 				marginTop:7*k,
	 				// opacity:this.anim,
	 				// width:!this.state.isUp?tag.length*10*k:tag.length*10*k+14*k,
	 				borderWidth:1,
	 				borderRadius:3,
	 				margin:3*k,
	 				borderColor:'#0679a2',
	 				backgroundColor:this.state.isUp?'#0679a2':'white',
	 				...center
	 				}}>
	 					<Animated.Text style={{
	 						color:!this.state.isUp?'#0679a2':'white',
	 						fontSize:13,
	 						textAlign:'justify',
	 						fontWeight:this.props.city && this.props.city?'700': '500'
	 					}}>{tag.get('text')}</Animated.Text>
	 					{!this.state.isUp?<View/>:this.props.city && this.props.city?false:
		 					<Animated.Image ref='cross' 
		 					source={{uri:'crossWhite',isStatic:true}} 
		 					style={{width:12*k,height:12*k,marginLeft:5*k,marginRight:2*k}}/>}
	 				</Animated.View>	
		 		
	 			</TouchableOpacity>
 			
			)
		}
}

Object.assign(Word.prototype, TimerMixin);


