import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
let {
  LayoutAnimation,
  Text,
  View,
  Animated,
  TextInput,
  Image,
  TouchableOpacity
} = React;
let UIManager = require('NativeModules').UIManager;

export default class Find extends React.Component{
	state={}
	tagClick(){
		LayoutAnimation.configureNext(openAnimation)
		this.textInput.blur()
		this.setState({text:''},()=>{
			this.cancelText.setNativeProps({style:{fontSize:0.1*k,}})	
			this.mainView.setNativeProps({style:{width:45*k,left:100}})
		})
		
	}
	cancel(){
		this.textInput.blur()
		this.setState({text:''})
		LayoutAnimation.configureNext(openAnimation)
		this.mainView.setNativeProps({style:{width:306*k}})
		this.cancelText.setNativeProps({style:{fontSize:0.1*k}})	
	}
	
	focus(px){
		LayoutAnimation.configureNext(openAnimation)
		this.mainView.setNativeProps({style:{width:250*k,left:0}})
		this.setTimeout(()=>this.cancelText.setNativeProps({style:{fontSize:15*k}}),200)
		this.props.showSuggestion && this.props.showSuggestion()
	
			
	}
	render(){

		return (
			<View>
				<View style={{flexDirection:'row',...center,backgroundColor:'white',paddingTop:5,paddingBottom:5
					}}>
					<View ref={el=>this.mainView=el}
						style={{
								justifyContent:'flex-start',
								alignItems:'center',
								flexDirection:'row',
								height:45*k,
								width:304*k,
								paddingLeft:5, 
								borderColor: '#0679a2', 
								borderWidth: 1,
								borderRadius:23*k
							}}>
							<TouchableOpacity onPress={()=>this.textInput.focus()} style={{backgroundColor:'transparent',height:40*k,width:30*k,...center}}>
								<Image ref='search-icon' source={{uri:'magnifying-glass16',isStatic:true}}
								style={{
									width:20*k,
									height:20*k}}/>
							</TouchableOpacity>
						    <TextInput ref={el=>this.textInput=el}		    	
					    		maxLength={40}
					    		clearTextOnFocus={true}
					    		clearButtonMode={'while-editing'}
					    		onFocus={this.focus.bind(this,100)}
					    		style={{fontSize:16,height:24*k,width:200*k,paddingLeft:6*k,backgroundColor:'transparent',alignSelf:'center'}}
								onChangeText={(text) => {
									// this.props.hideDeals()
									this.setState({text:text})}}
								value={this.state.text}/>
					</View>
					<TouchableOpacity onPress={this.cancel.bind(this)}>
					 	<Text ref={el=>this.cancelText=el} style={{color:'#0679a2',fontSize:0.1,marginLeft:5}}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}
Object.assign(Find.prototype, TimerMixin);

