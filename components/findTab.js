import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import Word from './word'
import {tags,data} from './mock'
import _ from 'lodash'
import Combinator from './combinator'
import {action$} from '../model'
import Deals from './deals'
import {ReplaySubject,Observable} from 'rx'
import {onTagTextChange} from '../intent/tagSearchText'
import {getQuery} from '../intent/getQuery';
import {toggleTag} from '../intent/toggleTag'
import Spinner from 'react-native-spinkit'
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
	static contextTypes={
    	state$: React.PropTypes.any
  	}
	state={text:'',searchedTags:[],loadingSuggestion:false,citySelectionHeight:220*k,hideSearch:false,chosenTags:[],city:{text:'Almaty'},loadDeals:false,placeholder:'Искать по тегам',tagCount:0}
	chooseCity(city){
		LayoutAnimation.easeInEaseOut()
		Animated.spring(this.anim,{toValue:this.anim._value>0?0:1}).start()
	}
	focus(){
		LayoutAnimation.easeInEaseOut()
		this.textInput.setNativeProps({style:{width:255*k}})
		this.cancelText.setNativeProps({style:{fontSize:15*k,marginLeft:5*k}})
		this.hideDeals()
		if(this.chosenTags){
			onTagTextChange('')
		}
	}
	cancel(){
		LayoutAnimation.configureNext(openAnimation)
		this.textInput.setNativeProps({style:{width:300*k}})
		this.cancelText.setNativeProps({style:{fontSize:0.1,marginLeft:0}})
		this.textInput.blur()
		if(this.chosenTags&&this.chosenTags[0]){
			// toggleTag('')
				this.showDeals()
			this.textInput.blur()
		}
	onTagTextChange('')
	}
	chooseTag(tag){
		this.anim.setValue(0)
		toggleTag(tag);
		this.textInput.setNativeProps({placeholder:'Добавить еще тег'})
		this.showDeals()
		this.setTimeout(()=>this.cancel(),0)
	}
	cancelTag(tag){
		this.anim.setValue(0)
		if(this.chosenTags[0] && this.searchedDeals!=='isLoading') {
			if(this.chosenTags.length>1){

				this.hideDeals()
				this.textInput.setNativeProps({placeholder:'Добавить еще тег'})
    				this.cancel()
					toggleTag(tag)				
			}else{
				this.textInput.setNativeProps({placeholder:'Искать по тегам'})
				this.hideDeals()
				toggleTag(tag)
				onTagTextChange('')
			}
		}
	}
	toggleSearch(val){
		this.anim.setValue(0)
		let h1,h2;
		if(k===1){
			h1=560
			h2=450
		}else if (k>1){
			h1=610
			h2=610
		}
		this.searchPanel.setNativeProps({style:{height:val?0:100*k}})
		this.deals.setNativeProps({style:{height:val?h1:h2}})
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
			this.slider && this.slider.setNativeProps({style:{flex:k>1?.09:0.01}})
			this.suggestion && this.suggestion.setNativeProps({style:{height:height}})
		},500)
	}
	handleKeyboardDisappear(){
		this.searchPanel&&this.searchPanel.measure((x,y,w,h,px,py)=>{
			if(h>0){
				let h1,h2;
				if(k===1){
					h1=500
					h2=450
				}else if (k>1){
					h1=520
					h2=600
				}
				this.slider && this.slider.setNativeProps({style:{flex:0}})
				!this.state.loadDeals && this.suggestion&&this.suggestion.setNativeProps({style:{height:h1}})
				this.state.loadDeals && this.deals && this.deals.setNativeProps({style:{height:h2}})
			}
		})
	}
	componentWillMount() {
		onTagTextChange('')
	}
	componentDidMount() {
        this._keyboardWillShowSubscription= DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardAppear.bind(this));
        this._keyboardWillHideSubscription= DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardDisappear.bind(this));
    }
    componentWillUnmount() {
        this._keyboardWillShowSubscription.remove();
        this._keyboardWillHideSubscription.remove();
    }
    showDeals(){
    	this.deals.setNativeProps({style:{opacity:1}})
    	this.bis.setNativeProps({style:{width:0*k,opacity:0}})

    }
    hideDeals(){
    	this.deals.setNativeProps({style:{opacity:0}})
    	this.bis.setNativeProps({style:{width:320*k,opacity:1}})

    }
    getMoreData(){
		getQuery([
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text'],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},['title','conditions','id','image','discount','payout']],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'business',['name','image']],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'likes','sort:createdAt=desc','count'],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'likedByUser', '{{me}}']
		])
	}
	render(){
		console.log('render find tab')
		this.anim=this.anim || new Animated.Value(0)
		this.latestScroll=this.latestScroll || 0
		return (
			<View style={{backgroundColor:'white',}}>

					<View ref={el=>this.searchPanel=el} style={{backgroundColor:'white',height:100*k}}>
						<Combinator me={'text input'}>
							<View ref={el=>this.search=el} style={{flexDirection:'row',...center,marginTop:10}}>
								{this.props.tagSearchText$.map(text1 => {
									return <TextInput ref={el=>this.textInput=el}		    	
							    		maxLength={40} 
							    		placeholder={'Искать по тегам'}
							    		clearTextOnFocus={true}
							    		clearButtonMode={'while-editing'}
							    		onFocus={this.focus.bind(this)}
							    		style={{fontSize:16,borderWidth:1,height:40*k,borderRadius:5,
							    			width:300*k,borderColor:'#cccccc',paddingLeft:10*k,
							    			backgroundColor:'transparent',alignSelf:'center'}}
										onChangeText={(text) => {
											if(!text.includes('+')){
												onTagTextChange(text)
											}
										}}
										value={text1}
										/>									
								})}
								<TouchableOpacity style={{backgroundColor:'transparent'}} onPress={this.cancel.bind(this)}><Text ref={el=>this.cancelText=el}	 
									style={{marginLeft:0,color:'#0679a2',fontSize:0.1,fontWeight:'500'}}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</Combinator>
						<ScrollView automaticallyAdjustContentInsets={false}
						ref={el=>this.scroll=el} horizontal={true} keyboardShouldPersistTaps={true}
							contentContainerStyle={{...center,}} 
							showsHorizontalScrollIndicator={false}
						 >
						 	<View style={{flexDirection:'row'}}>
						 	<Combinator me={'chosenTags'}>
						 		<View style={{flexDirection:'row',...center}}>
		 						<Word city={true} ref={el=>this.city=el} chooseTag={this.chooseCity.bind(this)} isUp={false} tag={this.state.city}/>
							 		{
							 			this.props.chosenTags$.map(
							 				chosenTags=>{
							 					if(chosenTags){
									 				return <View style={{flexDirection:'row'}}>
								 						{chosenTags.map(tag=>{
															return <Word cannotClick={this.state.loadDeals} cancelTag={this.cancelTag.bind(this)} key={tag.id+'chosen'} isUp={true} tag={tag}/>
														})}
								 					</View>
									 			}
							 				})
									}
						 		</View>
						 	</Combinator>
			
						 	</View>
						</ScrollView>
						<View style={{...separator,}}/>
					</View>
				
		
				<View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>

				
						<View ref={el=>this.deals=el} style={{height:500*k}}>

							<Combinator  me={'deals'}>

							{
								this.context.state$.map(state => {
									if (state.chosenTags) {
										this.chosenTags = state.chosenTags
										this.tagIdString = state.chosenTags.map(x => x.id).join(',')
									}
									if (!state.dealsById) {
										return <Deals search={true}
												toggleSearch={this.toggleSearch.bind(this)}
												data={[]}/>
									}
									if (state.chosenTags && state.chosenTags.length>4) {
											return <View style={{...center}}>
												<Text style={{margin:10,color:'gray',textAlign:'center',width:300*k}}>К сожалению, мы ничего не нашли для Вашей комбинации тегов. Попробуйте другую комбинацию.</Text>
											</View>
									}
									let data;
									if (state.dealsByTags && state.dealsById && state.chosenTags) {
										data = _.values(state.dealsByTags[this.tagIdString]).map(path => state.dealsById[path[1]]).filter(x=>x)										
									} else {
										return <View style={{...center}}>
											<Text style={{margin:15,color:'gray',textAlign:'center'}}>К сожалению, мы ничего не нашли для Вашей комбинации тегов. Попробуйте другую комбинацию.</Text>
										</View>
									}
									this.numberOfSearchedDeals = data ? data.length : 0
									return <Deals search={true}
										getMoreData={this.getMoreData.bind(this)}
										toggleSearch={this.toggleSearch.bind(this)}
										data={data}
									/>
								})
							}
							</Combinator>
						</View>
					  <View ref={el=>this.bis=el} style={{position:'absolute',left:0}}
					  >
						<View ref={el=>this.suggestion=el} style={{height:500*k,flex:1}}> 
							<ScrollView keyboardShouldPersistTaps={true}>
								<Combinator me={'suggestion tags'}>
									<View style={{flexDirection:'row',flexWrap:'wrap',...center,width:320*k,marginRight:100}}> 
										{
											this.context.state$.map(state => {
												let {tagsByText: searchedTags, tagSearchText} = state
													if (searchedTags==='not found') {
														return <View style={{...center}}>
															<Text style={{margin:10,color:'gray',textAlign:'center'}}>Не найдено.</Text>
															<Text style={{color:'gray',textAlign:'center'}}>Попробуйте ввести другой тег.</Text>
														</View>
													}
													let tagsToShow = searchedTags && searchedTags[tagSearchText] && _.values(searchedTags[tagSearchText]).
													filter(tag => tag && tag.text).filter(tag=>{
														if(this.chosenTags){
															return !this.chosenTags.map(tag=>tag.id).includes(tag.id)
														}
														return true

													}).map(tag => (
														<Word chooseTag={this.chooseTag.bind(this)} key={tag.id} isUp={false} tag={tag}/>
													));
													if (_.isEmpty(tagsToShow) && tagsToShow !== undefined) {
														return <View style={{...center}}>
															<Text style={{margin:10,color:'gray',textAlign:'center'}}>Не найдено.</Text>
															<Text style={{color:'gray',textAlign:'center'}}>Попробуйте ввести другой тег.</Text>
														</View>
													}
													return tagsToShow
												})
										}
										{
											this.props.searchedTags$.map(loading=>{
												// console.log(loading)
												if(loading==='isLoading'){
												return	(<View style={{backgroundColor:'rgba(255,255,255,0.9)',
															width:320*k,top:0*k,right:0,flexDirection:'column',
															position:'absolute',justifyContent:'flex-start',alignItems:'center',height:500}}>
										 	 				  <Spinner style={{marginTop:15*k}} isVisible={true} size={30} type={'WanderingCubes'} color={'#aaaaaa'}/>       
									    				  </View>
									    				  )
												}
												return null
											})
										}		
									</View>
								</Combinator>
							</ScrollView>
							<View ref={el=>this.slider=el}/>
						</View>
						<View style={{flex:100}}>
								<View >
									{this.props.isLoadingTags?
										(<View style={{backgroundColor:'rgba(255,255,255,0.8)',
											width:320*k,top:0*k,flexDirection:'column',
											position:'absolute',justifyContent:'flex-start',alignItems:'center',height:500}}>
						 	 				  <Spinner style={{marginTop:15*k}} isVisible={this.state.renderPlaceholderOnly} size={30} type={'WanderingCubes'} color={'#aaaaaa'}/>       
					    				  </View>):<View/>
									}
								</View>
						</View>
					</View>
				
				</View>
				<Animated.View style={{flex:1,position:'absolute',bottom:0,height:this.anim.interpolate({inputRange:[0,1],outputRange:[0,this.state.citySelectionHeight]}),
				backgroundColor:'rgba(0,132,180,0.9)',width:320*k,justifyContent:'flex-start',alignItems:'center',opacity:this.anim,
				}}>

						<Animated.Text style={{fontSize:this.anim.interpolate({inputRange:[0,0.2,1],outputRange:[0.1,15,15]}),fontWeight:'600',color:'white',marginTop:40*k,width:250*k,textAlign:'center'}}>Пока мы только в Алматы. Скоро и в других городах!</Animated.Text>
				</Animated.View>
			</View>	
		)
	}
}
Object.assign(FindTab.prototype, TimerMixin);

