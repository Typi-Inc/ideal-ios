import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deals from './deals'
import {openAnimation} from './animations'
import Test from './test'
import Info from './info'
import Comments from './comments'
import Address from './address'
import {deal} from './mock'
import _ from 'lodash'

let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View,
  LayoutAnimation,
  TouchableOpacity,
  ScrollView,
  Image,
  SegmentedControlIOS,
  DeviceEventEmitter
} = React;
export default class DealContent extends React.Component{
	state={num:0,count:0,commentCount:0}
	changeTab(num){
		// this.requestAnimationFrame(()=>{
			// LayoutAnimation.configureNext(openAnimation)
			this.setState({
				num:num,
				count:this.state.count+1
			}, ()=>{
				if (num===2) {
					this.props.openCommentBox()
				} else {
					this.props.closeCommentBox()
				}	
			})
		// })
	}

	render(){
		let tabView,commentBox;
		if (this.state.num===0){
			tabView = <Info setBuyText={this.props.setBuyText} deal={this.props.deal} count={this.state.count} />
		} else if (this.state.num===1) {
			tabView = <Address/>
		} else {
			tabView = <Comments deal={this.props.deal} />
		}
		return (	
			<View style={{marginTop:0,marginBottom:20}}>
				{tabView}	
			</View>
 		)
	}
}
Object.assign(DealContent.prototype, TimerMixin);

