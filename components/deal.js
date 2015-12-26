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
let UIManager = require('NativeModules').UIManager;

let {
  Text,
  View,
  StatusBarIOS,
  LayoutAnimation,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Animated,
  Image,
  DeviceEventEmitter,
  InteractionManager,
  ScrollView
} = React;
export default class Deal extends React.Component{
	state={isOpen:this.props.isOpen,hidden:false,num:0,slideUp:0,commentBox:false,text:'',isLoaded:false,loading:this.props.isOpen};

//ANIMATE OPENING AND CLOSING BEGHINNING-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
	animateScrollToTop(){
		this.refs['scroll'].scrollWithoutAnimationTo()
	}
	toggleOpen(open){
		this.setState({isOpen:open})
	}
	moveUp(pagey){
		this.refs['mainView'].setNativeProps({
			style:{
				top:-pagey,
			}
		})
	}
	moveDown(pagey){
		this.refs['mainView'].setNativeProps({
			style:{
				top:0,
			}
		})
	}
	isHidden(){
		return this.state.hidden
	}
	hide(){
		this.refs['mainView'].setNativeProps({
			style:{
				top:300*k,
			}
		})
		this.state.hidden=true
	}
	unHide(){
		this.refs['mainView'].setNativeProps({
			style:{
				top:0,
			}
		})
		this.state.hidden=false
	}
	animateOpen(pagey,t){
		this.refs['mainView'].setNativeProps({
			style:{
				height:k===1?580*h:600*h,
				width:320*k,
				top:-pagey+t,
				marginLeft:0,
				borderWidth:0,	
			}
		})
		this.anim.setValue(0)
		// if(this.anim._value===1){
		// 	this.openHelper()
		// }
	}	
	
	animateClose(pagey){
		this.refs['mainView'].setNativeProps({
			style:{
				height:360*h,
				width:300*k,
				top:0,
				marginLeft:10*k,
				borderWidth:1,
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
		  	this.refs['scroll'].scrollTo(400*h,0)
		}
	  }
	handleKeyboardDisappear(e){
		if(this.refs['comment-box']){
			this.refs['comment-box'].hide()
	  		this.keyboard=0
	  		this.refs['scroll'].scrollTo(200,0)
		}  	
	  }
	componentDidMount() {
		// LayoutAnimation.configureNext(LayoutAnimation.create(100,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.opacity));
        this._keyboardWillShowSubscription= DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardAppear.bind(this));
        this._keyboardWillHideSubscription= DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardDisappear.bind(this));
         InteractionManager.runAfterInteractions(() => {
		 		this.setTimeout(()=>{
		 			this.setState({loading:false})
		 		},200)
		 		
		});

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
			// console.log(x,y,py)
		})
	}
	render(){
		this.anim=this.anim || new Animated.Value(0)
		let deal=this.props.deal
		// console.log('deal',deal)
		this.move=this.move || 0
		this.keyboard=this.keyboard || 0
		if(this.state.loading){
			return (<View style={{backgroundColor:'e8e8ee',flexDirection:'column',flex:1,alignItems:'center',justifyContent:'flex-start',height:600*k}}>
		 	   <Spinner style={{marginTop:15*k}} isVisible={this.state.renderPlaceholderOnly} size={30} type={'WanderingCubes'} color={'0679a2'}/>       
	      </View>)
		}
		
		// if(this.state.isLoaded){
		// 	console.log('render deal',this.props.deal.id)
			return (

			<Animated.View ref='mainView' 
			style={{flex:1,width:this.state.isOpen?320*k:300*k,height:this.state.isOpen?568*h:360*k,
				backgroundColor:'white',marginLeft:this.state.isOpen?0:10*k,marginTop:this.state.isOpen?0:10*k,
				borderWidth:this.state.isOpen?0:1,borderColor:'#e4e4e4'
			}}>
				<ScrollView 
				ref='scroll'
				scrollEventThrottle={16}
				onScroll={(e)=>{
					if (e.nativeEvent.contentOffset.y<-100*k){
						this.props.closeDeal()
					}
				}}
				onTouchStart={(e)=>{this.move=0}}
				onTouchMove={(e)=>{this.move=1}}
				onTouchEnd={(e)=>{
						if (this.move===0 && this.keyboard===1 && this.refs['comment-box']){
							this.refs['comment-box'].blurText()
						}					
				}}
				keyboardShouldPersistTaps={true}
				stickyHeaderIndices={[0]}
				automaticallAdjustContentInsets={true}
				scrollEnabled={this.state.isOpen}>
					{this.state.isOpen ? <DealNavbar commentBox={this.state.commentBox} openCommentBox={this.openCommentBox.bind(this)}
						closeCommentBox={this.closeCommentBox.bind(this)} 
						toggleScroll={this.toggleScroll.bind(this)} 
						navigator={this.props.navigator} 
						closeDeal={this.props.closeDeal}/>:<DealAuthor openHelper={this.openHelper.bind(this)} business={deal.business}/>}
					
					<DealCard ref={el=>this.dealCard=el} closeDeal={this.props.closeDeal} viewDeal={this.props.viewDeal} deal={deal} isOpen={this.state.isOpen}/>
					{this.state.isOpen?<DealContent 
						ref='deal-content' isOpen={this.state.isOpen}
						closeCommentBox={this.closeCommentBox.bind(this)} 
						openCommentBox={this.openCommentBox.bind(this)} deal={deal} conditions={deal.conditions}/>:<View/>}
				</ScrollView>
					{this.state.commentBox?<CommentBox pushedFromLenta={this.props.pushedFromLenta && this.props.pushedFromLenta} ref='comment-box' submitComment={this.submitComment.bind(this)}/>:<View/>}

					<Animated.View ref={el=>this.dialog=el} style={{
						height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,182*k]}),
						backgroundColor:'rgba(0,132,180,0.9)',overflow:'visible',
						width:299*k,
						position:'absolute',
						// padding:10*k,
						top:50*k,left:0,justifyContent:'flex-start',alignItems:'center',
						opacity:this.anim.interpolate({inputRange:[0,0.8,0.9,1],outputRange:[0,1,1,1]}),

					}}>
						<Text style={{color:'white',marginTop:15*k,fontWeight:'900',
						fontSize:14}}>Cкопируй ссылку.</Text>
						<Text style={{color:'white',marginTop:15*k,fontWeight:'900',
						fontSize:14}}>Отправь друзьям.</Text>
						<Text style={{textAlign:'center',color:'white',marginTop:15*k,fontWeight:'900',
						fontSize:14}}>За каждую покупку получи 1000 тг и выше.</Text>
						

						<TouchableOpacity>
							<View style={{marginTop:19*k,borderWidth:1,borderColor:'white',height:35*k,...center,borderRadius:3*k}}>
								<Text style={{color:'white',fontWeight:'700',fontSize:15,margin:10}}>Начать</Text>
							</View>

						</TouchableOpacity>


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
