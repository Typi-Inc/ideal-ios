import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deals from './deals'
import {openAnimation} from './animations'
import Test from './test'
import Info from './info'
import Comments from './comments'
import Address from './address'
import {deal} from './mock'

let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  LayoutAnimation,
  TouchableOpacity,
  Image,
  DeviceEventEmitter
} = React;
export default class DealContent extends React.Component{
	state={num:0,count:0,commentCount:0}
	changeTab(num){
		this.requestAnimationFrame(()=>{
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
			this.setState({num:num,count:this.state.count+1,commentCount:num===2?this.state.commentCount+1:this.state.commentCount},()=>{
				if(num===2){
					this.props.openCommentBox()
				}else{
					this.props.closeCommentBox()
				}	
			})
		})
		
	}
	render(){
		let tabView,commentBox;
		if(this.state.num===0){
			tabView=<Info count={this.state.count} conditions={this.props.conditions}/>

		}else if (this.state.num===1){
			tabView=<Address/>
		}else{
			tabView=<Comments count={this.state.commentCount} comments={this.props.deal.comments}/>
			// this.setTimeout(()=>this.props.openCommentBox(),300)
		
		}
		return (	
				<View style={{marginTop:0,marginBottom:20}}>
					 

					<View style={{height:1,backgroundColor:'e4e4e4'}}/>
					<View style={{flexDirection:'row',alignItems:'center',height:50*k,justifyContent:'center'}}>
						<TouchableOpacity onPress={this.changeTab.bind(this,0)} style={{flex:1,height:50*k,...center}}><Image source={{uri:this.state.num===0?'infoBlue':'infoGrey',isStatic:true}} style={{width:18*k,height:22*k,}} /></TouchableOpacity>
						 <View style={{width:1,height: 50*k,backgroundColor:"#e4e4e4"}}/>
						<TouchableOpacity onPress={this.changeTab.bind(this,1)} style={{flex:1,height:50*k,...center}}><Image source={{uri:this.state.num===1?'addressBlue':'addressGrey',isStatic:true}} style={{width:26*k,height:20*k,}} /></TouchableOpacity>
						 <View style={{width:1,height: 50*k,backgroundColor:"#e4e4e4"}}/>
						<TouchableOpacity onPress={this.changeTab.bind(this,2)} style={{flex:1,height:50*k,...center}}><Image source={{uri:this.state.num===2?'commentBlue':'commentGrey',isStatic:true}} style={{width:20*k,height:22*k,}}/></TouchableOpacity>
					</View>
					<View style={{height:1,backgroundColor:'e4e4e4'}}/>
				{tabView}	
					
				</View>
				


     		)
	}
}
Object.assign(DealContent.prototype, TimerMixin);

