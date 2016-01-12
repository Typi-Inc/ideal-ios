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

const propsArray = [];

export default class Deals extends React.Component{
	state={canOpen:true,loadNewer:false,enabled:true}
	static contextTypes={
    	toggleTabs: React.PropTypes.func
  	}
  	// componentWillReceiveProps(props){
  		// propsArray.push(props)
  		// console.log(props.data[0])
  		// console.log(this.props.data[0])
  		// if(props.data[0]&&props.data[0].likedByUser&&props.data[0].likedByUser['{{me}}']){
  		// 	this.oldProps=props
  		// }
  		
  		
  		// console.log(props.data[0],'------',this.props.data[0])
  	// 	this.setState({props: this.props})
  	// }
  	disable(){
  		// this.setTimeout(() => {
  		// 	this.forceUpdate()
  		// }, 200)
  		// this.setState({enabled:false},()=>{
  			// this.setTimeout(()=>{
  			// 	this.setState({enabled:true})
  			// },500)
  		// })
  	}
  	shouldComponentUpdate(nextProps, nextState) {
  		// console.log('herehre')
  		// console.log('update deals?', !_.isEqual(this.props.data,nextProps.data))
  		// console.log(oldProps)
  		// console.log(this.props.data[0])
  		// console.log('----------------------------------------------------------------------')
  		// console.log('----------------------------------------------------------------------')
  		// console.log(nextProps.data[0])
	  	// 	if (propsArray.length > 2) {
				// const result = !_.isEqual(propsArray[propsArray.length-3].data, nextProps.data);
				// propsArray.shift();
				// return result
	  	// 	}
	  		// return true;	
  		// let result
	  	// if (this.update) {
	  	// 	result = this.update
	  	// } else {
	  	// 	result = !_.isEqual(nextProps.data,this.props.data)
	  	// }
	  	// console.log(this.props.data[0])
	  	// console.log()
	  	// if(this.oldProps){
	  	// 	return !_.isEqual(nextProps.data,this.oldProps)
	  	// }
  		
  		return !_.isEqual(nextProps.data,this.props.data)
  		// this.update = false
  		// return result
	}
	moveUpPrev(item,pagey){
		let prev=this.props.data.indexOf(item)-1			
		if(prev>-1){
			let prevRef=''+this.props.data[prev].id
			this.refs[prevRef].moveUp(pagey)
			let prev1=this.props.data.indexOf(item)-2
			if(prev1>-1){
				let prevRef1=''+this.props.data[prev1].id
				if(this.refs[prevRef1])this.refs[prevRef1].moveUp(pagey)
			}
		}
		return;
	}
	moveDownPrev(item,pagey){
		let prev=this.props.data.indexOf(item)-1			
		if(prev>-1){
			let prevRef=''+this.props.data[prev].id
			this.refs[prevRef].moveDown(pagey)
			let prev1=this.props.data.indexOf(item)-2
			if(prev1>-1){
				let prevRef1=''+this.props.data[prev1].id
				if(this.refs[prevRef1])this.refs[prevRef1].moveDown(pagey)
			}
		}
		return;
	}
	hideNext(item,pagey){
		if(pagey<60){
			let nextRef=''+this.props.data[this.props.data.indexOf(item)+1].id
			if(this.refs[nextRef]){
				this.refs[nextRef].hide()
			}
			
		}
		return;
	}
	unHideNext(item){
		if(this.props.data[this.props.data.indexOf(item)+1]){
			let nextRef=''+this.props.data[this.props.data.indexOf(item)+1].id 
			if(this.refs[nextRef]&&this.refs[nextRef].isHidden()){
				this.refs[nextRef].unHide()
			}
		}
		return;
	}
	viewDeal(item,refS){
			this.toggleScroll(false)

			let handle = React.findNodeHandle(this.refs[refS]);
			UIManager.measure(handle,(x,y,width,height,pagex,pagey)=>{
				LayoutAnimation.configureNext(openAnimation);

				this.refs[refS].toggleOpen(true)
				this.moveUpPrev(item,pagey)
				this.hideNext(item,pagey)
				if(this.props.navbar){
					this.refs['navbar'].destroy()
					this.refs[refS].animateOpen(pagey,75*k)
				}else if(this.props.search){
					this.refs[refS].animateOpen(pagey,125*k)
				}else{
					this.refs[refS].animateOpen(pagey,25*k)
				}
				this.context.toggleTabs(true)
				this.props.toggleSearch && this.props.toggleSearch(true)
			})
	
	}
	closeDeal(item,refS){
			this.toggleScroll(true)
			this.refs[refS].toggleScroll(false)
			this.refs[refS].closeCommentBox()

			this.context.toggleTabs(false)
			let handle = React.findNodeHandle(this.refs[refS]);
			UIManager.measure(handle,(x,y,width,height,pagex,pagey)=>{
				LayoutAnimation.configureNext(openAnimation);
				this.refs[refS].toggleOpen(false)
				this.refs[refS].animateScrollToTop()
				this.unHideNext(item)
				this.moveDownPrev(item,pagey)
				this.refs[refS].animateClose(pagey)
				if(this.props.navbar){
					this.refs['navbar'].revive()
				}
				this.props.toggleSearch && this.props.toggleSearch(false)
			
			})

	}
	toggleScroll(val){
		this.refs['scroll'].setNativeProps({
			scrollEnabled:val,
		})
	}
	componentWillReceiveProps(props){
		this.stopFetch=false
	}
	fetchBottom(){
		// if(!this.props.search){
			// if(this.props.search) this.disable()
			this.props.getMoreData();
		// }
	}
	render(){
		this.oldProps=this.oldProps || null
		// this.count=this.count||0
		console.log('render deals',this.props.status&&this.props.status)
		this.canOpen=1
		this.y=this.y || 0;
		if(this.props.data[0]){
			// this.props.toggleClick(true)
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
				ref='scroll'>
					{this.props.data.map((deal,i)=>{
						let refS = ''+deal.id
						return (
							<Deal disable={this.disable.bind(this)} ref={refS} //navigator={this.props.navigator}
							 key={''+deal.id} deal={deal}  
							 isOpen={false}
							 viewDeal={!this.state.loadNewer?this.viewDeal.bind(this,deal,refS):null}
							 closeDeal={this.closeDeal.bind(this,deal,refS)}
							 />
							)						
					})}
				</ScrollView>
			</View>
			)
		}	
		return (<View>
			{this.props.navbar ? <Navbar ref='navbar' title={this.props.title} navigator={this.props.navigator}/>:null}
		 <View style={{backgroundColor:'#e8e8ee',flexDirection:'column',flex:1,alignItems:'center',justifyContent:'flex-start',height:600*k,width:320*k}}>
		 	   <Spinner style={{marginTop:15*k}} isVisible={this.state.renderPlaceholderOnly} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
	      </View>
			</View>)

	}
}
			// {this.state.loadNewer?	 <Spinner style={{marginTop:5*k,alignSelf:'center',marginBottom:5}} isVisible={this.state.loadNewer} size={30} type={'WanderingCubes'} color={'0679a2'}/>:null}
// 


Object.assign(Deals.prototype, TimerMixin);


