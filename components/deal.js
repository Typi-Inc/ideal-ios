import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,scrollToTopAnimation,closeImageAnimation} from './animations'
import DealNavbar from './deal-navbar'
import DealAuthor from './deal-author'
import DealContent from './deal-content'
import Info from './info'
import DealCard from './deal-card'
import CommentBox from './comment-box'
import Spinner from 'react-native-spinkit'
import Loading from './loading'
import Payout from './payout'
import _ from 'lodash'
let UIManager = require('NativeModules').UIManager;

let {
  Text,
  View,
  StatusBarIOS,
  LayoutAnimation,
  TouchableWithoutFeedback,
  SegmentedControlIOS,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
  DeviceEventEmitter,
  InteractionManager,
  ScrollView
} = React;
export default class Deal extends React.Component{
	state={earnOpen:false,isOpen:this.props.isOpen,hidden:false,num:0,slideUp:0,commentBox:false,text:'',isLoaded:false,loading:this.props.isOpen};
	static contextTypes={
    	showModal: React.PropTypes.func,hideModal:React.PropTypes.func
  	}
//ANIMATE OPENING AND CLOSING BEGHINNING-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	animateScrollToTop(){
		this.refs['scroll'].scrollWithoutAnimationTo()
	}
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.deal !== nextProps.deal
	}
	toggleOpen(open){
		this.setState({isOpen:open})
	}
	moveUp(pagey){
		this.mainView.setNativeProps({
			style:{
				top:-pagey,
			}
		})
	}
	moveDown(pagey){
		this.mainView.setNativeProps({
			style:{
				top:0,
			}
		})
	}
	isHidden(){
		return this.state.hidden
	}
	hide(){
		console.log('hiding')
		this.mainView.setNativeProps({
			style:{
				top:300*k,
			}
		})
		this.state.hidden=true
	}
	unHide(){
		this.mainView.setNativeProps({
			style:{
				top:0,
			}
		})
		this.state.hidden=false
	}
	animateOpen(pagey,t){
		this.mainView.setNativeProps({
			style:{
				height:k===1?600*h:600*k,
				// width:320*k,
				top:-pagey+t,
				// marginLeft:0,
				// borderWidth:0,	
			}
		})
		this.anim.setValue(0)
		// if(this.anim._value===1){
		// 	this.openHelper()
		// }
	}	
	
	animateClose(pagey){
		this.mainView.setNativeProps({
			style:{
				height:355*k,
				// width:300*k,
				top:0,
				// marginLeft:10*k,
				// borderWidth:1,
			}
		})
		
	}
	toggleScroll(val){
		this.refs['scroll'].setNativeProps({
			scrollEnabled:val
		})
	}
//ANIMATE OPENINING AND CLOSING END===-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//METHODS FOR HANDLING COMMENTS BEGINNING-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	openCommentBox(){
		// LayoutAnimation.configureNext(openAnimation)
		this.setState({commentBox:true})
	}
	closeCommentBox(){
		// LayoutAnimation.configureNext(openAnimation)

		this.setState({commentBox:false})
	}
	submitComment(){
		this.refs['text-input'].blur()
	}
	handleKeyboardAppear(e){
	  	if(this.refs['comment-box']){
			this.refs['comment-box'].show()
		  	this.keyboard=1
		  	// this.refs['scroll'].scrollTo(400*h,0)
		}
	  }
	handleKeyboardDisappear(e){
		if(this.refs['comment-box']){
			this.refs['comment-box'].hide()
	  		this.keyboard=0
	  		// this.refs['scroll'].scrollTo(200,0)
		}  	
	  }
	componentDidMount() {
		// LayoutAnimation.configureNext(LayoutAnimation.create(100,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.opacity));
        this._keyboardWillShowSubscription= DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardAppear.bind(this));
        this._keyboardWillHideSubscription= DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardDisappear.bind(this));
  //        InteractionManager.runAfterInteractions(() => {
		//  		this.setTimeout(()=>{
		//  			this.setState({loading:false})
		//  		},200)
		 		
		// });

    }
    componentWillUnmount() {
        this._keyboardWillShowSubscription.remove();
        this._keyboardWillHideSubscription.remove();
    }
//METHODS FOR HANDLING COMMENTS END-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	// componentDidMount(){
			// LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
			 // InteractionManager.runAfterInteractions(() => {
				//  		this.setState({isLoaded:true},()=>console.log('loading again'))
	   //  		});
	// }	
	openHelper(){
		Animated.spring(this.anim,{toValue:this.anim._value===0?1:0,tension:40,velocity:this.anim._value===0?20:0,friction:10}).start()
		UIManager.measure(React.findNodeHandle(this.dialog),(x,y,w,h,px,py)=>{
		})
	}
	openEarn(){
		Animated.spring(this.earn,{toValue:1,velocity:20,tension:40,friction:10}).start(()=>{
			this.setState({earnOpen:true})
		})

	}
	closeEarn(){
		this.setTimeout(()=>this.setState({earnOpen:false}),200)
		Animated.timing(this.earn,{toValue:0,duration:200}).start()
			
	}
	shouldComponentUpdate(nextProps,nextState){
		return !this.props.deal.equals(nextProps.deal) || this.state !== nextState
	}
	render(){
		this.earn=this.earn || new Animated.Value(0)
		this.slideDownStyle1={
			position:'absolute',
			shadowColor:'#444444',
	        shadowOffset:{width:1,height:2},
	        shadowOpacity:1,
			opacity:this.earn.interpolate({inputRange:[0,.1,.5,.8,.9,1],outputRange:[0,0,.0,0,.1,1]}),

			// opacity:this.earn.interpolate({inputRange:[0,.6,1],outputRange:[0,this.earn._value>0?1:0,1]}),
			top:50*k,
			left:this.earn.interpolate({inputRange:[0,1],outputRange:[160*k,0*k]}),
			height:this.earn.interpolate({inputRange:[0,0.1,0.2,.3,.6,1],outputRange:[0*k,30,80,100,200,600*k]}),
			width:this.earn.interpolate({inputRange:[0,1],outputRange:[0*k,320*k]}),
		}
		this.anim=this.anim || new Animated.Value(0)
		this.scrollOffsetY=this.scrollOffsetY || 0
		let deal=this.props.deal
		this.move=this.move || 0
		this.keyboard=this.keyboard || 0
		if(this.state.loading){
			return (<View style={{backgroundColor:'e8e8ee',flexDirection:'column',flex:1,alignItems:'center',justifyContent:'flex-start',height:600*k}}>
		 	   <Spinner style={{marginTop:15*k}} isVisible={this.state.renderPlaceholderOnly} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
	      </View>)
		}
			return (
			<Animated.View ref={el=>this.mainView=el} 
			style={{flex:1,width:this.state.isOpen?320*k:320*k,height:355*k,
				backgroundColor:'white',marginTop:this.state.isOpen?0:10*k,
				// borderWidth:this.state.isOpen?0:1,borderColor:'#e4e4e4'
			}}>
				{this.state.isOpen ? <DealNavbar closeEarn={this.closeEarn.bind(this)} openEarn={this.openEarn.bind(this)} commentBox={this.state.commentBox} openCommentBox={this.openCommentBox.bind(this)}
					closeCommentBox={this.closeCommentBox.bind(this)} 
					toggleScroll={this.toggleScroll.bind(this)} 
					navigator={this.props.navigator} 
					closeDeal={this.props.closeDeal}/>:<DealAuthor
						viewDeal={this.props.viewDeal} isOpen={this.state.isOpen} 
						openHelper={this.openHelper.bind(this)} business={deal.get('business')}/>
				}
				<ScrollView 
				ref='scroll'
				onTouchStart={(e)=>{this.move=0}}
				onTouchMove={(e)=>{this.move=1}}
				onTouchEnd={(e)=>{
						if (this.move===0 && this.keyboard===1 && this.refs['comment-box']){
							this.refs['comment-box'].blurText()
						}					
				}}
				scrollEventThrottle={16}
				onScroll={(e)=>{
					this.scrollOffsetY=e.nativeEvent.contentOffset.y
				}}
				keyboardShouldPersistTaps={true}
				stickyHeaderIndices={this.state.isOpen?[1]:null}
				automaticallAdjustContentInsets={false}
				scrollEnabled={this.state.isOpen}>
					<DealCard  ref={el=>this.dealCard=el} disable={this.props.disable} closeDeal={this.props.closeDeal} viewDeal={this.props.viewDeal} deal={deal} isOpen={this.state.isOpen}/>
					{this.state.isOpen?<View><View style={{paddingRight:15,paddingLeft:15,marginBottom:10*k}}>
						<View style={{height:5*k}}/>
					   <SegmentedControlIOS values={['Сделки', 'Инфо', 'Комменты']} 
					   tintColor={'#0084b4'} selectedIndex={0}
					   onValueChange={(e)=>{
					   		if(e==='Сделки'){
					   			if(this.scrollOffsetY<300*k){
					   				this.refs['scroll'].scrollTo(300*k)
					   			}else{
					   				this.refs['scroll'].scrollWithoutAnimationTo(300*k)
					   			}	
					   			this.refs['deal-content'].changeTab(0)
					   		}else if(e==='Инфо'){
					   			if(this.scrollOffsetY<300*k){
					   				this.refs['scroll'].scrollTo(300*k)
					   			}else{
					   				this.refs['scroll'].scrollWithoutAnimationTo(300*k)
					   			}
					   			this.refs['deal-content'].changeTab(1)
					   		}else{
					   			if(this.scrollOffsetY<300*k){
					   				this.refs['scroll'].scrollTo(300*k)
					   			}else{
					   				this.refs['scroll'].scrollWithoutAnimationTo(300*k)
					   			}
					   			this.refs['deal-content'].changeTab(2)
					   		}
					   }}
					   />			   
					</View><View style={{...separator,marginTop:5*k}}/></View>:<View/>}

					{this.state.isOpen?

						<DealContent 
						ref='deal-content' isOpen={this.state.isOpen}
						closeCommentBox={this.closeCommentBox.bind(this)} 
						openCommentBox={this.openCommentBox.bind(this)} deal={deal} conditions={deal.get('conditions')}/>:null}
				</ScrollView>
					{this.state.commentBox?<CommentBox pushedFromLenta={this.props.pushedFromLenta && this.props.pushedFromLenta} ref='comment-box' submitComment={this.submitComment.bind(this)}/>:<View/>}
					<Animated.View ref={el=>this.dialog=el} style={{
						height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,182*k]}),
						backgroundColor:'rgba(0,132,180,0.9)',overflow:'visible',
						width:320*k,
						position:'absolute',
						paddingRight:10*k,paddingLeft:10*k,
						top:50*k,left:0,justifyContent:'flex-start',alignItems:'center',
						opacity:this.anim.interpolate({inputRange:[0,0.8,0.9,1],outputRange:[0,1,1,1]}),
					}}>
						<Animated.Text style={{color:'white',marginTop:15*k,fontWeight:'900',
						fontSize:this.anim.interpolate({inputRange:[0,this.anim._value>0?.9:.2,1],outputRange:[0.1,this.anim._value>0?0.1:14,14]}),}}>Cкопируй ссылку.</Animated.Text>
						<Animated.Text style={{color:'white',marginTop:15*k,fontWeight:'900',
						fontSize:this.anim.interpolate({inputRange:[0,this.anim._value>0?.9:.2,1],outputRange:[0.1,this.anim._value>0?0.1:14,14]}),}}>Отправь друзьям.</Animated.Text>
						<Animated.Text style={{textAlign:'center',color:'white',marginTop:15*k,fontWeight:'900',
						fontSize:this.anim.interpolate({inputRange:[0,this.anim._value>0?.9:.2,1],outputRange:[0.1,this.anim._value>0?0.1:14,14]}),}}>За каждую покупку друга получи 1000 тг и выше.</Animated.Text>
						<TouchableOpacity style={{...center}}  onPress={()=>this.context.showModal({component:<Payout/>})}>
							<Animated.View style={{marginTop:19*k,borderWidth:1,borderColor:'white',width:this.anim.interpolate({inputRange:[0,.3,1],outputRange:[0,this.anim._value>0?0:85*k,85*k]}),height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,35*k]}),...center,borderRadius:3*k}}>
								<Animated.Text style={{color:'white',fontWeight:'700',fontSize:this.anim.interpolate({inputRange:[0,this.anim._value>0?.9:.3,1],outputRange:[0.1,this.anim._value>0?0.1:14,15]}),margin:10}}>Начать</Animated.Text>
							</Animated.View>
						</TouchableOpacity>
				</Animated.View>
				<Animated.View ref={el=>this.slideDown1=el} style={this.slideDownStyle1}>
					{this.state.earnOpen?<Payout/>:<Loading color={'#0084b4'} isVisible={!this.state.open} size={30}/>}
				</Animated.View>


			</Animated.View>
					)
		// }

		// return (
		// 	<View style={{flex:1,...center}}>
		// 		<Spinner style={{marginBottom:140*k}} isVisible={!this.state.isLoaded} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
		// 	</View>
		// 	)	

	}
}
Object.assign(Deal.prototype, TimerMixin);
// 
