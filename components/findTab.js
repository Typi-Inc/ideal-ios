import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Find from './find'
import Word from './word'
import {tags,data} from './mock'
import Deals from './deals'
import {openAnimation,spring1,spring2,scrollToTopAnimation,closeImageAnimation} from './animations'
import Loading from './loading'
let {
  LayoutAnimation,
  Text,
  View,
  Animated,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  PickerIOS,
  DeviceEventEmitter
} = React;
let PickerItemIOS=PickerIOS.Item
let UIManager = require('NativeModules').UIManager;

export default class FindTab extends React.Component{
	state={loadingSuggestion:false,citySelectionHeight:260*k,hideSearch:false,chosenTags:[],city:'Almaty',loadDeals:false,placeholderText:'Искать по тагам',tagCount:0}
	chooseCity(city){
		LayoutAnimation.easeInEaseOut()
		this.setState({city:city,loadDeals:true},()=>{
		Animated.spring(this.anim,{toValue:this.anim._value>0?0:1}).start()
		})
	}
	focus(){
		LayoutAnimation.easeInEaseOut()
		this.textInput.setNativeProps({style:{width:255*k}})
		this.cancelText.setNativeProps({style:{fontSize:15*k,marginLeft:5*k}})
		this.setState({loadDeals:false})
		// if(!this.state.loadDeals) this.suggestion.setNativeProps({style:{height:200*k}})
	}
	cancel(){
		LayoutAnimation.easeInEaseOut()
		this.textInput.setNativeProps({style:{width:300*k}})
		this.cancelText.setNativeProps({style:{fontSize:0.1,marginLeft:0}})
		this.textInput.blur()
		this.setState({text:''})
		if(this.state.tagCount>0){
			this.setState({loadDeals:true})
		}
		
		// this.suggestion && this.suggestion.setNativeProps({style:{height:500*k}})

	}
	chooseTag(tag){
		this.anim.setValue(0)
		let newState = React.addons.update(this.state, {
			chosenTags : {$unshift : [tag]},
			loadDeals:{$set:true},
			placeholderText:{$set:'Добавить еще таг'},
			tagCount:{$set:this.state.tagCount+1},
			text:{$set:''}
		});
		// LayoutAnimation.configureNext(openAnimation)
		this.setState(newState)
		// this.setTimeout(()=>{
		// 	UIManager.measure(React.findNodeHandle(this.city),(x,y,w,h,px,py)=>{
		// 		if(x>150){
		// 			let offset;
		// 			if (tag.length<5){
		// 				offset=240
		// 			}else if(tag.length<10){
		// 				offset=220
		// 			}else if(tag.length>17){
		// 				offset=250
		// 			}else{
		// 				offset=200
		// 			}
		// 			this.scroll.scrollTo(0,x-offset)
		// 			this.latestScroll=x-offset
		// 		}
		// 	})	
		// },200)
		this.scroll.setNativeProps({directionalLockEnabled:true,horizontal:true})
			
		
		this.setTimeout(()=>this.cancel(),0)
	}
	cancelTag(tag){
		this.anim.setValue(0)
		let chosenTags=this.state.chosenTags.splice(this.state.chosenTags.indexOf(tag),1)
		LayoutAnimation.easeInEaseOut()
		this.setState({chosenTags:this.state.chosenTags,
			tagCount:this.state.tagCount-1,loadDeals:this.state.tagCount>1?true:false,
			placeholderText:this.state.tagCount>1?'Добавить еще таг':'Искать по тагам'
		})	
	}
	toggleSearch(val){
		this.anim.setValue(0)
		// LayoutAnimation.easeInEaseOut()
		let h1,h2;
		if(k===1){
			h1=500
			h2=450
		}else if (k>1){
			h1=610
			h2=490
		}
		this.searchPanel.setNativeProps({style:{height:val?0:100*k}})
		this.deals.setNativeProps({style:{height:val?h1:h2}})
		// this.setState({citySelectionHeight:200*k})
		// this.setState({hideSearch:val})
		// if(!val && this.state.tagCount>1) this.scroll.scrollTo(0,this.latestScroll)

	}
	handleKeyboardAppear(){
		let height;
		if(k===1){
			height=196
		}else if (k>1){
			height=300
		}
		this.anim.setValue(0)
		this.setTimeout(()=>{
			this.slider && this.slider.setNativeProps({style:{flex:k>1?.8:1}})
			this.suggestion && this.suggestion.setNativeProps({style:{height:height}})
		},500)
	}
	handleKeyboardDisappear(){
		let h1,h2;
		if(k===1){
			h1=500
			h2=450
		}else if (k>1){
			h1=520
			h2=600
		}
		this.slider && this.slider.setNativeProps({style:{flex:0}})
		!this.state.loadDeals && this.suggestion.setNativeProps({style:{height:h1}})
		this.state.loadDeals && this.deals.setNativeProps({style:{height:h2}})
	}


	componentDidMount() {
		// LayoutAnimation.configureNext(LayoutAnimation.create(100,LayoutAnimation.Types.keyboard,LayoutAnimation.Properties.opacity));
        this._keyboardWillShowSubscription= DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardAppear.bind(this));
        this._keyboardWillHideSubscription= DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardDisappear.bind(this));
    }
    componentWillUnmount() {
        this._keyboardWillShowSubscription.remove();
        this._keyboardWillHideSubscription.remove();
    }

	render(){

		this.anim=this.anim || new Animated.Value(0)
		this.latestScroll=this.latestScroll || 0
		return (
			<View style={{backgroundColor:'white',flex:1,}}>

					<View ref={el=>this.searchPanel=el} style={{backgroundColor:'white',height:100*k}}>
						<View ref={el=>this.search=el} style={{flexDirection:'row',...center,marginTop:10}}>
							<TextInput ref={el=>this.textInput=el}		    	
					    		maxLength={40} 
					    		placeholder={this.state.placeholderText}
					    		clearTextOnFocus={true}
					    		clearButtonMode={'while-editing'}
					    		onFocus={this.focus.bind(this)}
					    		style={{fontSize:16,borderWidth:1,height:40*k,borderRadius:5,
					    			width:300*k,borderColor:'#cccccc',paddingLeft:10*k,
					    			backgroundColor:'transparent',alignSelf:'center'}}
								onChangeText={(text) => {
									// this.props.hideDeals()
									this.setState({text:text})}}
								value={this.state.text}/>
							<TouchableOpacity style={{backgroundColor:'transparent'}} onPress={this.cancel.bind(this)}><Text ref={el=>this.cancelText=el}	 
								style={{marginLeft:0,color:'#0679a2',fontSize:0.1,fontWeight:'500'}}>Cancel</Text>
							</TouchableOpacity>
						</View>
						<ScrollView automaticallyAdjustContentInsets={false}
						ref={el=>this.scroll=el} horizontal={true} keyboardShouldPersistTaps={true}
							contentContainerStyle={{...center,}} showsHorizontalScrollIndicator={false}
						 >
						 	<Word city={true} ref={el=>this.city=el} chooseTag={this.chooseCity.bind(this)} isUp={false} tag={this.state.city}/>

						 	{this.state.chosenTags.map((tag,i)=>{
								return <Word cancelTag={this.cancelTag.bind(this,tag)} key={i} isUp={true} tag={tag}/>
						 	})}

						</ScrollView>
						<View style={{...separator,}}/>
					</View>
				
		
				<View style={{flex:1}}>

				{this.state.loadDeals ? <View ref={el=>this.deals=el} style={{flex:1,height:500*k}}><Deals search={true} toggleSearch={this.toggleSearch.bind(this)} data={data}/></View>:
					<View ref={el=>this.suggestion=el} style={{height:500*k,flex:1}}> 
					<ScrollView keyboardShouldPersistTaps={true}>
						<View style={{flexDirection:'row',flexWrap:'wrap',...center}}> 
							{tags.map((tag,i)=>{
								return <Word chooseTag={this.chooseTag.bind(this)} key={i} isUp={false} tag={tag}/>
							})}				
						</View>
					</ScrollView>
					<View ref={el=>this.slider=el}/>
					</View>
				}
				</View>
				
					
				<Animated.View style={{flex:1,position:'absolute',bottom:0,height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,this.state.citySelectionHeight]}),
				backgroundColor:'rgba(0,132,180,0.9)',width:320*k,justifyContent:'flex-start',alignItems:'center',opacity:this.anim,
				}}>
						<TouchableOpacity  style={{...center,height:40}} onPress={this.chooseCity.bind(this,'Almaty')}><Animated.Text style={{fontSize:this.anim.interpolate({inputRange:[0,1],outputRange:[0.1,15]}),fontWeight:'700',color:'white'}}>Almaty</Animated.Text></TouchableOpacity>
						<TouchableOpacity style={{...center,height:40}} onPress={this.chooseCity.bind(this,'Astana')}><Animated.Text style={{fontSize:this.anim.interpolate({inputRange:[0,1],outputRange:[0.1,15]}),fontWeight:'700',color:'white'}}>Astana</Animated.Text></TouchableOpacity>
						<TouchableOpacity style={{...center,height:40}} onPress={this.chooseCity.bind(this,'Moscow')}><Animated.Text style={{fontSize:this.anim.interpolate({inputRange:[0,1],outputRange:[0.1,15]}),fontWeight:'700',color:'white'}}>Moscow</Animated.Text></TouchableOpacity>
						<TouchableOpacity style={{...center,height:40}} onPress={this.chooseCity.bind(this,'London')}><Animated.Text style={{fontSize:this.anim.interpolate({inputRange:[0,1],outputRange:[0.1,15]}),fontWeight:'700',color:'white'}}>London</Animated.Text></TouchableOpacity>
				</Animated.View>
			</View>	
		)
	}
}
Object.assign(FindTab.prototype, TimerMixin);

