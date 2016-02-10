import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
// import {oxpenAnimation} from './animations'
import Tabs from './tabs'
import Combinator from './combinator'
import FindTab from './findTab'
import Navbar from './navbar'
let UIManager = require('NativeModules').UIManager;
let {
  LayoutAnimation,
  Text,
  View,
  Navigator,
  Animated,
  StatusBarIOS,
} = React;
var store = require('react-native-simple-store');

export default class App extends React.Component{
	state={modalVisible:false}
	static childContextTypes={state$:React.PropTypes.any,}
	getChildContext(){
		return {state$: this.props.state$,}
	}
	componentWillMount(){
	}
	showModal(someProps){
		this.insideModal=someProps.component
		this.setState({modalVisible:true})
	}
	hideModal(){
		this.setState({modalVisible:false})
	}
	toggleInCart(val){
		if(val)this.inCart=true
		else this.inCart=false
	}
	renderApp(route,navigator){
		// this.navigator=navigator
		// console.log('rendering app',this.navigator)

		if(route.name==='Other'){
			return <View style={{backgroundColor:'white',flex:1}}>
						<Navbar navigator={navigator} backButton={true} title={route.title}/>
							{route.component}
					</View>
		}
		return <Tabs toggleInCart={this.toggleInCart.bind(this)} topNav={navigator} ref={el=>this.tabs=el}/>
	}
	render(){
		StatusBarIOS.setStyle('light-content');
		this.anim=this.anim || new Animated.Value(0)
		return (
				<View style={{flex:1,backgroundColor:'#0679a2'}}>
					<View ref='status' style={{height:20,backgroundColor:'#0679a2', }}/>
					 <Navigator
					 		ref={el=>this.navigator=el}
							initialRoute={{name:'tabApp'}}
							renderScene={this.renderApp.bind(this)}
							configureScene={(route,routeStack)=>{
								if(route.name==='Other') return Navigator.SceneConfigs.FloatFromBottom
								return Navigator.SceneConfigs.FloatFromRight
							}}
						/>	
						

						<Combinator>
							<View style={{position:'absolute',top:60*k}}>
								{
									this.props.state$.map(state=>state.get('chosenItems')).distinctUntilChanged().
									map(chosenItems=>{
										if(!chosenItems)return <View/>
										let totalSum=chosenItems.valueSeq().toArray().map(item=>{
											if(!item)return;
											return item.get('certificates').valueSeq().toArray()
												.map(certificate=>certificate.get('newPrice')*certificate.get('count')).reduce((x,y)=>x+y)
										}).reduce((x,y)=>x+y, 0)
										if (totalSum>0&&!this.inCart){

												Animated.timing(this.anim,{toValue:1,duration:200}).start()
												this.setTimeout(()=>{
												Animated.timing(this.anim,{toValue:0,duration:200}).start()
													
												},1000)
											let top=h>0.99?425*k:340

											return <Animated.View style ={{backgroundColor:'rgba(0,132,180,0.9)',
													position:'absolute',
													top:top,
													height:this.anim.interpolate({inputRange:[0,0.2,1],outputRange:[0*k,35*k,35*k]}),
													padding:10*k,
													left:60*k,
													alignSelf:'center',
													borderRadius:this.anim.interpolate({inputRange:[0,0.2,1],outputRange:[0*k,2*k,3*k]}),
													opacity:this.anim,
													...center,
													// shadowColor:'#444444',
								     //    			shadowOffset:{width:1,height:2},
								     //   				 shadowOpacity:1,
													}}>
														<Animated.Text style={{color:'white',
														fontSize:this.anim.interpolate({inputRange:[0,0.2,1],outputRange:[0.1*k,13*k,13*k]})}}>
															Итого к оплате: {totalSum} тенге</Animated.Text>
													</Animated.View>
										}else{
											return <View/>
										}
									})
								}
							</View>
						</Combinator>
				</View>
			)
	}


}

Object.assign(App.prototype, TimerMixin);


				   
