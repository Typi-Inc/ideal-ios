import React from 'react-native'
import Deal from './deal'
// import {data} from './ mock'
import {openAnimation,closeImageAnimation} from './animations'
import TimerMixin from 'react-timer-mixin'
import Navbar from './navbar'
import Spinner from 'react-native-spinkit';
import Loading from './loading'
import _ from 'lodash'
let EventEmitter = require('EventEmitter');
let UIManager = require('NativeModules').UIManager;
let {
  AppRegistry,
  StyleSheet,
  LayoutAnimation,
  Text,
  View,
  ScrollView,
  StatusBarIOS,
  InteractionManager
} = React;

export default class Deals extends React.Component{
	state={loadNewer:false}
	static contextTypes={
    	toggleTabs: React.PropTypes.func
  	}
	componentWillReceiveProps(props){
		this.stopFetch=false
	}
	moveUpPrev(currentIndex,pagey){
		let prev = currentIndex - 1
		if (prev > -1) {
			let prevRef = this.props.data.getIn([prev, 'id'])
			this[prevRef].moveUp(pagey)
		}
		return;
	}
	moveDownPrev(currentIndex,pagey){
		let prev = currentIndex - 1			
		if(prev>-1){
			let prevRef = this.props.data.getIn([prev, 'id'])
			this[prevRef].moveDown(pagey)
		}
		return;
	}
	hideNext(currentIndex,pagey){
		if(pagey<100){
			let nextRef = this.props.data.getIn([currentIndex + 1, 'id'])
			if(this[nextRef]){
				console.log('herehe')
				this[nextRef].hide()
			}
			
		}
		return;
	}
	unHideNext(currentIndex){
		if (this.props.data.get(currentIndex + 1)){
			let nextRef = this.props.data.getIn([currentIndex+1, 'id'])
			if(this[nextRef]&&this[nextRef].isHidden()){
				this[nextRef].unHide()
			}
		}
		return;
	}
	viewDeal(refS){
			this.toggleScroll(false)
			let currentIndex = this.props.data.findIndex(value => value.get('id') === refS)

			let handle = React.findNodeHandle(this[refS]);
			UIManager.measure(handle,(x,y,width,height,pagex,pagey)=>{
				LayoutAnimation.configureNext(openAnimation);

				this[refS].toggleOpen(true)
				this.moveUpPrev(currentIndex, pagey)
				this.hideNext(currentIndex, pagey)
				if(this.props.navbar){
					this.refs['navbar'].destroy()
					this[refS].animateOpen(pagey,75*k)
				}else if(this.props.search){
					this[refS].animateOpen(pagey,125*k)
				}else{
					this[refS].animateOpen(pagey,25*k)
				}
				this.context.toggleTabs(true)
				this.props.toggleSearch && this.props.toggleSearch(true)
			})
	
	}
	closeDeal(refS){
			this.toggleScroll(true)
			this[refS].toggleScroll(false)
			this[refS].closeCommentBox()
			let currentIndex = this.props.data.findIndex(value => value.get('id') === refS)

			this.context.toggleTabs(false)
			let handle = React.findNodeHandle(this[refS]);
			UIManager.measure(handle,(x,y,width,height,pagex,pagey)=>{
				LayoutAnimation.configureNext(openAnimation);
				this[refS].toggleOpen(false)
				this[refS].animateScrollToTop()
				this.unHideNext(currentIndex)
				this.moveDownPrev(currentIndex,pagey)
				this[refS].animateClose(pagey)
				if(this.props.navbar){
					this.refs['navbar'].revive()
				}
				this.props.toggleSearch && this.props.toggleSearch(false)
			
			})

	}
	toggleScroll(val){
		this.scroll.setNativeProps({
			scrollEnabled:val,
		})
	}
	fetchBottom(){
		this.props.getMoreData();
	}
	shouldComponentUpdate(nextProps,nextState){
		return this.props.data !== nextProps.data || this.state !== nextState
	}
	render(){
		console.log('render deals')
		if(this.props.data.get(0)) {
			return (
				<View style={{flex:1,backgroundColor:'#e8e8ee'}}>
					{this.props.navbar ? <Navbar ref='navbar' title={this.props.title} navigator={this.props.navigator}/>:null}
					<ScrollView
					keyboardShouldPersistTaps={true}
					scrollEnabled={true}
					automaticallAdjustContentInsets={true}
					contentContainerStyle={{paddingBottom:this.props.search?80:0}}
					onScroll={(e)=>{
						if(e.nativeEvent.contentSize.height-e.nativeEvent.contentOffset.y<2700 && !this.stopFetch){
							this.stopFetch=true
							this.fetchBottom()	
						}
					}}
					scrollEventThrottle={5000}
					ref={el=>this.scroll=el}>
						{
							this.props.data.toArray().map(deal => (
								<Deal ref={el=>this[deal.get('id')]=el}
									key={deal.get('id')} deal={deal}  
									isOpen={false}
									viewDeal={!this.state.loadNewer?this.viewDeal.bind(this,deal.get('id')):null}
									closeDeal={this.closeDeal.bind(this,deal.get('id'))}
								/>
							))
						}
					</ScrollView>
				</View>
			)
		}	
		return (
			<View>
				{this.props.navbar ? <Navbar ref='navbar' title={this.props.title} navigator={this.props.navigator}/>:null}
				<View style={{backgroundColor:'#e8e8ee',flexDirection:'column',flex:1,alignItems:'center',justifyContent:'flex-start',height:600*k,width:320*k}}>
			    	<Spinner style={{marginTop:15*k}} isVisible={this.state.renderPlaceholderOnly} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
				</View>
			</View>
		)
	}
}

Object.assign(Deals.prototype, TimerMixin);
