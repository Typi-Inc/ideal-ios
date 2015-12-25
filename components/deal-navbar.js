import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Deal from './deal'
import {openAnimation} from './animations'
import Test from './test'
import Info from './info'
import Deals from './deals'
import {data} from './mock'
import Certificate from './certificate'
import Loading from './loading'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Animated,
  View,
} = React;
export default class DealNavbar extends React.Component{
	state={open:false}
	earnClick(){

		this.setTimeout(()=>Animated.timing(this.anim4,{toValue:1,duration:350}).start(),100)
		this.setTimeout(()=>Animated.timing(this.anim1,{toValue:1,duration:250}).start(),200)
		// this.props.toggleOpacity()
		// this.setTimeout(()=>this.test.click(),200)
		this.props.toggleScroll(false)
		if(this.props.commentBox && this.props.commentBox){
			LayoutAnimation.easeInEaseOut()
			this.props.closeCommentBox()
			this.openCommentBox=true
		}
		this.setTimeout(()=>{
			LayoutAnimation.easeInEaseOut()
			this.setState({open:true,openCommentBox:this.openCommentBox})
		},500)
	}
	backEarnClick(){
		this.setTimeout(()=>{
			if(this.state.openCommentBox){
				LayoutAnimation.easeInEaseOut()
				this.props.openCommentBox()
				this.openCommentBox=false
			}

		},500)
		// this.setTimeout(()=>this.test.backClick(),0)
		// this.test.backClick()
		Animated.timing(this.anim1,{toValue:0,duration:250}).start()
		this.setTimeout(()=>Animated.timing(this.anim4,{toValue:0,duration:350}).start(),200)
		this.props.toggleScroll(true)
		// this.props.toggleOpacity()
		this.setTimeout(()=>this.setState({open:false,openCommentBox:this.openCommentBox}),500)
	}
	buy(){
		this.setTimeout(()=>Animated.timing(this.anim3,{toValue:1,duration:350}).start(),100)
		this.setTimeout(()=>Animated.timing(this.anim2,{toValue:1,duration:250}).start(),200)
		this.props.toggleScroll(false)
		if(this.props.commentBox && this.props.commentBox){
			LayoutAnimation.easeInEaseOut()
			this.props.closeCommentBox()
			this.openCommentBox=true
		}
		this.setTimeout(()=>{
			LayoutAnimation.easeInEaseOut()
			this.setState({open:true,openCommentBox:this.openCommentBox})
		},500)
	}
	buyBack(){
		this.setTimeout(()=>{
			if(this.state.openCommentBox){
				LayoutAnimation.easeInEaseOut()
				this.props.openCommentBox()
				this.openCommentBox=false
			}
		},500)
		Animated.timing(this.anim2,{toValue:0,duration:250}).start()
		this.setTimeout(()=>Animated.timing(this.anim3,{toValue:0,duration:350}).start(),200)
		this.props.toggleScroll(true)
		this.setTimeout(()=>this.setState({open:false,openCommentBox:this.openCommentBox}),500)
	}
	render(){
		this.anim4=this.anim4 || new Animated.Value(0)
		this.anim3=this.anim3 || new Animated.Value(0)
		this.anim1=this.anim1 || new Animated.Value(0)
		this.anim2=this.anim2 || new Animated.Value(0)
		this.slide=this.slide || new Animated.Value(0)
		this.animatedStyle1={
			height:this.anim1.interpolate({inputRange:[0,.4,.8,1],outputRange:[35*k,35*k,40*k,55*k]}),
			borderRadius:this.anim1.interpolate({inputRange:[0,1],outputRange:[3*k,0*k]}),
			width:this.anim1.interpolate({inputRange:[0,1],outputRange:[100*k,320*k]}),
			backgroundColor:'#0679a2',
			left:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,-100*k]}),
			marginLeft:50*k,
			flexDirection:'row',
			alignItems:'center',
			justifyContent:'center',
			// opacity:this.anim3.interpolate({inputRange:[0,1],outputRange:[1,.3]}),
			shadowColor:'#444444',
	        shadowOffset:{width:4,height:4},
	        shadowOpacity:this.anim4,
		}
		this.textAnimatedStyle1={
			color:'white',
			fontWeight:'600',
			marginRight:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,20*k]}),			
			fontSize:this.anim1.interpolate({inputRange:[0,1],outputRange:[12*k,16*k]}),
		}
		this.imageAnimatedStyle1={
			height:this.anim1.interpolate({inputRange:[0,.5,.7,1],outputRange:[0*k,0,0,16*k]}),
			width:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,16*k]}),
		}
		this.buttonAnimatedStyle1={
			height:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,50*k]}),
			width:this.anim1.interpolate({inputRange:[0,0.5,0.8,1],outputRange:[0*k,10,60,70*k]}),
			// opacity:this.anim1.interpolate({inputRange:[0,.1,.5,1],outputRange:[0,1,1,1]}),			
			...center,
			marginRight:this.anim1.interpolate({inputRange:[0,.5,1],outputRange:[0*k,10,65*k]}),
			marginLeft:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,10*k]}),
		}
		this.slideDownStyle1={
			position:'absolute',
			opacity:this.anim1.interpolate({inputRange:[0,.1,.5,.8,.9,1],outputRange:[0,0,.0,0,.1,1]}),
			top:this.anim1.interpolate({inputRange:[0,1],outputRange:[50*k,50*k]}),
			left:this.anim1.interpolate({inputRange:[0,1],outputRange:[160*k,0*k]}),
			height:this.anim1.interpolate({inputRange:[0,0.1,0.2,.3,.6,1],outputRange:[0*k,30,80,100,200,600*k]}),
			width:this.anim1.interpolate({inputRange:[0,0.5,.8,1],outputRange:[0*k,100,200,320*k]}),
		}
		this.animatedStyle2={
			height:this.anim2.interpolate({inputRange:[0,.4,.8,1],outputRange:[35*k,36*k,40*k,55*k]}),
			borderRadius:this.anim2.interpolate({inputRange:[0,0.5,1],outputRange:[3*k,3,0*k]}),
			// top:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,-300*k]}),
			width:this.anim2.interpolate({inputRange:[0,1],outputRange:[90*k,320*k]}),
			backgroundColor:this.anim2.interpolate({inputRange:[0,1],outputRange:['#00b484','#0679a2']}),
			left:this.anim2.interpolate({inputRange:[0,0.5,1],outputRange:[0*k,-100,-200*k]}),
			marginRight:10*k,
			flexDirection:'row',
			right:this.anim1.interpolate({inputRange:[0,1],outputRange:[0*k,-100*k]}),

			alignItems:'center',
			// opacity:this.anim4.interpolate({inputRange:[0,1],outputRange:[1,.3]}),
			justifyContent:'center',
			shadowColor:'#444444',
	        shadowOffset:{width:4,height:4},
	        shadowOpacity:this.anim3,
		}
		this.textAnimatedStyle2={
			color:'white',
			fontWeight:'600',
			marginRight:this.anim2.interpolate({inputRange:[0,1],outputRange:[0*k,20*k]}),			
			fontSize:this.anim2.interpolate({inputRange:[0,1],outputRange:[12*k,16*k]}),
		}
		this.imageAnimatedStyle2={
			height:this.anim2.interpolate({inputRange:[0,.5,.7,1],outputRange:[0*k,0,0,16*k]}),
			width:this.anim2.interpolate({inputRange:[0,1],outputRange:[0*k,16*k]}),
		}
		this.buttonAnimatedStyle2={
			height:this.anim2.interpolate({inputRange:[0,1],outputRange:[0*k,50*k]}),
			width:this.anim2.interpolate({inputRange:[0,0.5,0.8,1],outputRange:[0*k,10,60,70*k]}),
			// opacity:this.anim1.interpolate({inputRange:[0,.1,.5,1],outputRange:[0,1,1,1]}),			
			...center,
			marginRight:this.anim2.interpolate({inputRange:[0,1],outputRange:[0*k,80*k]}),
			marginLeft:this.anim2.interpolate({inputRange:[0,1],outputRange:[0*k,0*k]}),
		}
		this.slideDownStyle2={
			position:'absolute',
			opacity:this.anim2.interpolate({inputRange:[0,.1,.5,.8,.9,1],outputRange:[0,0,.0,0,.1,1]}),
			top:this.anim2.interpolate({inputRange:[0,1],outputRange:[50*k,50*k]}),
			left:this.anim2.interpolate({inputRange:[0,1],outputRange:[160*k,0*k]}),
			height:this.anim2.interpolate({inputRange:[0,0.1,0.2,.3,.6,1],outputRange:[0*k,30,80,100,200,600*k]}),
			width:this.anim2.interpolate({inputRange:[0,0.5,.8,1],outputRange:[0*k,100,200,320*k]}),
		}


		return (
			<View style={{}}>
			<View style={[{backgroundColor:'#e8e8ee',paddingTop:5*k,
				height:50*k,alignItems:'center',justifyContent:'space-between',flexDirection:'row'}]}>
				<TouchableOpacity onPress={this.props.closeDeal}>
					<View style={{height:40*k,width:50*k,...center}}>
						<Image style={{height:12*k,width:17*k}} source={{uri:'back',isStatic:true}}/>
					</View>
				</TouchableOpacity>
				<TouchableWithoutFeedback  onPress={!this.state.open?this.earnClick.bind(this):null}>
					<View>
						<Animated.View ref={el=>this.earn=el} style={this.animatedStyle1}>
							<TouchableOpacity style={this.buttonAnimatedStyle1} onPress={this.backEarnClick.bind(this)}>
								<Animated.Image style={this.imageAnimatedStyle1} source={{uri:'crossWhite',isStatic:true}}/>
							</TouchableOpacity>
							<Animated.Text ref={el=>this.earnText=el} style={this.textAnimatedStyle1}>Заработать</Animated.Text>
							<Animated.View style={{backgroundColor:'blue',width:this.anim1.interpolate({inputRange:[0,1],outputRange:[0,120*k]})}}/>
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>
				
				<TouchableWithoutFeedback onPress={!this.state.open?this.buy.bind(this):null}>
					<Animated.View style={this.animatedStyle2}>
						<TouchableOpacity style={this.buttonAnimatedStyle2} onPress={this.buyBack.bind(this)}>
								<Animated.Image style={this.imageAnimatedStyle2} source={{uri:'crossWhite',isStatic:true}}/>
							</TouchableOpacity>
						<Animated.Text style={this.textAnimatedStyle2}>Купить</Animated.Text>
						<Animated.View style={{backgroundColor:'blue',width:this.anim2.interpolate({inputRange:[0,1],outputRange:[0,125*k]})}}/>

					</Animated.View>
				</TouchableWithoutFeedback>
			</View>
				
				<Animated.View ref={el=>this.slideDown2=el} style={this.slideDownStyle2}>
					{this.state.open?<Info/>:<Loading color={'#00b484'} isVisible={!this.state.open} size={30}/>}
				</Animated.View>
				<Animated.View ref={el=>this.slideDown1=el} style={this.slideDownStyle1}>
					{this.state.open?<Info/>:<Loading color={'#0084b4'} isVisible={!this.state.open} size={30}/>}
				</Animated.View>

			</View>
			
     		)
	}
}
Object.assign(DealNavbar.prototype, TimerMixin);

				// <Test open={this.state.open} ref={el=>this.test=el}/>



