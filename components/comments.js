import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
import Comment from './comment'
import Loading from './loading'
let {
  LayoutAnimation,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} = React;
export default class Comments extends React.Component{
	state={loading:this.props.count===1}
	componentDidMount(){
		this.setTimeout(()=>{
			LayoutAnimation.easeInEaseOut()
			this.setState({loading:false})
		},300)
		
	}

	render(){
		if(!this.state.loading){
			return (
			<View style={{marginBottom:0*k}}>
				<TouchableOpacity>
					<View style={{height:30*k,...center}}>
						<Text style={{color:'0084b4',fontSize:13*k,fontWeight:'700'}}>View more...</Text>
					</View>
					<View style={{height:1,backgroundColor:'e4e4e4',marginTop:5*k}}/>

				</TouchableOpacity>

				{this.props.comments.map((comment,i)=>{
					return <Comment key={i} comment={comment}/>
				})}


			</View>
		)
		}
		return <Loading color={'#0679a2'} size={30} isVisible={this.state.loading}/>
		
	}
}
Object.assign(Comments.prototype, TimerMixin);
