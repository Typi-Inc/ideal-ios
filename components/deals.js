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
  InteractionManager,
  RefreshControl
} = React;

export default class Deals extends React.Component{
	state={loadNewer:false,isRefreshing:false,loadingMore:false,finished:true}
	static contextTypes={
    	toggleTabs: React.PropTypes.func
  	}
	componentWillReceiveProps(props){
		if (props.data.size>this.props.data.size){
			this.setState({loadingMore:false,finished:false})
		}
	}
	moveUpPrev(currentIndex,pagey){
		let prev = currentIndex - 1
		if (prev > -1) {
			let prevRef = this.props.data.getIn([prev, 'id'])
			this[prevRef].moveUp(pagey)
			let prevRef1=this.props.data.getIn([prev-1,'id'])
			this[prevRef1].moveUp(pagey)
		}
		return;
	}
	moveDownPrev(currentIndex,pagey){
		let prev = currentIndex - 1			
		if(prev>-1){
			let prevRef = this.props.data.getIn([prev, 'id'])
			this[prevRef].moveDown(pagey)
			let prevRef1=this.props.data.getIn([prev-1,'id'])
			this[prevRef1].moveDown(pagey)
		}
		return;
	}
	hideNext(currentIndex,pagey){
		if(pagey<100){
			let nextRef = this.props.data.getIn([currentIndex + 1, 'id'])
			if(this[nextRef]){
				this[nextRef].hide()
				let nextRef1 = this.props.data.getIn([currentIndex + 2, 'id'])
				if(this[nextRef1]) this[nextRef1].hide()
			}
			
		}
		return;
	}
	unHideNext(currentIndex){
		if (this.props.data.get(currentIndex + 1)){
			let nextRef = this.props.data.getIn([currentIndex+1, 'id'])
			if(this[nextRef]&&this[nextRef].isHidden()){
				this[nextRef].unHide()
				let nextRef1 = this.props.data.getIn([currentIndex + 2, 'id'])
				if(this[nextRef1]&&this[nextRef1].isHidden()) this[nextRef1].unHide()
				
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
				this.props.toggleSearch && this.props.toggleSearch(true)
				this[refS].toggleOpen(true)
				this.moveUpPrev(currentIndex, pagey)
				this.hideNext(currentIndex, pagey)
				if(this.props.navbar){
					this.refs['navbar'].destroy()
					this[refS].animateOpen(pagey,75*k)
				}else if(this.props.search){
					this[refS].animateOpen(pagey,130*k)
				}else{
					this[refS].animateOpen(pagey,30*k)
				}
				// this.context.toggleTabs(true)
				
			})
	
	}
	closeDeal(refS){
		this[refS].scrollUp()
		this.setTimeout(()=>{
			this.toggleScroll(true)

			this[refS].toggleScroll(false)
			this[refS].closeCommentBox()
			let currentIndex = this.props.data.findIndex(value => value.get('id') === refS)

			// this.context.toggleTabs(false)
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
		},100)
			

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
		return !this.props.data.equals(nextProps.data)|| this.state !== nextState
	}
	onRefresh(){
		this.setState({isRefreshing:true},()=>{
		})

		this.setTimeout(()=>console.log('hello')||this.setState({isRefreshing:false}),2000)
	}

	render(){
		// console.log('render deals',this.props.status)
		if(this.props.data.get(0)) {
			return (
				<View style={{flex:1,backgroundColor:'#e8e8ee'}}>
					{this.props.navbar ? <Navbar ref='navbar' title={this.props.title} navigator={this.props.navigator}/>:null}
					<ScrollView
					keyboardShouldPersistTaps={true}
					scrollEnabled={!this.state.loadingMore}
					automaticallAdjustContentInsets={true}
					contentContainerStyle={{paddingBottom:this.props.search?100*k:0}}
					onScroll={(e)=>{
						if(Math.abs(e.nativeEvent.contentSize.height-e.nativeEvent.contentOffset.y)<480*k && !this.state.loadingMore && !this.state.finished){
							this.setState({loadingMore:true,finished:true})
							this.setTimeout(()=>{
								this.setState({finished:!this.state.finished?false:true,loadingMore:false})
							},500)
							this.fetchBottom()	
						}
					}}
					scrollEventThrottle={16}
					ref={el=>this.scroll=el}>
						{
							this.props.data.toArray().map((deal,i) => (
								<Deal index={i} ref={el=>this[deal.get('id')]=el}
									key={deal.get('id')} deal={deal}  
									isOpen={false}
									search={this.props.search}
									viewDeal={this.viewDeal.bind(this,deal.get('id'))}
									closeDeal={this.closeDeal.bind(this,deal.get('id'))}
								/>
							))
						}
			    	<Spinner style={{marginTop:15*k,alignSelf:'center',marginBototm:10*k}} isVisible={this.state.loadingMore} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
			    	<View style={{height:10}}/>
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
