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
	state={text:'',searchedTags:[],loadingSuggestion:false,citySelectionHeight:260*k,hideSearch:false,chosenTags:[],city:{text:'Almaty'},loadDeals:false,placeholderText:'Искать по тегам',tagCount:0}
	shouldComponentUpdate(p,s){
		if(s.loadDeals===this.state.loadDeals){
			return false
		}//else if(s.placeholderText===this.state.placeholderText) return false
		return true
	}
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
		if(this.chosenTags){
			this.setState({loadDeals: false})

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
					this.setState({
						loadDeals: true,
					})
			this.textInput.blur()
		}
	// onTagTextChange('')
	}
	chooseTag(tag){
		this.anim.setValue(0)
		this.setState({placeholderText:'Добавить еще тег'},()=>{
				toggleTag(tag);
				this.setState({
					loadDeals: true,
				})
		})
		this.setTimeout(()=>this.cancel(),0)
	}
	cancelTag(tag){
		this.anim.setValue(0)
		if(this.chosenTags[0] && this.searchedDeals!=='isLoading') {
			if(this.chosenTags.length>1){
					this.setState({
					loadDeals: true,
					placeholderText:'Добавить еще тег'
				}, () => {
    //					console.log('toggling tag')
					toggleTag(tag)
				})
			}else{
				this.setState({
					loadDeals: false,
					placeholderText:'Искать по тегам'
				}, () => {
					toggleTag(tag)
					onTagTextChange('')
				})

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
		this.subscription = this.context.state$.subscribe(state => {
			this.dealsById = state.dealsById
		})

        this._keyboardWillShowSubscription= DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardAppear.bind(this));
        this._keyboardWillHideSubscription= DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardDisappear.bind(this));
    }
    componentWillUnmount() {
    	this.subscription.dispose()
        this._keyboardWillShowSubscription.remove();
        this._keyboardWillHideSubscription.remove();
    }
    getMoreData(){
    	// console.log('loading more data',this.tagIdString,this.numberOfSearchedDeals)
		getQuery([
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text'],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},['title','conditions','id','image','discount','payout']],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'business',['name','image']],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'likes','sort:createdAt=desc','count'],
			['dealsByTags',this.tagIdString,{from:this.numberOfSearchedDeals,to:this.numberOfSearchedDeals+10},'likedByUser', '{{me}}']
		])
	}
	render(){
		// console.log(this.state.loadDeals, 'load Deals ?')
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
							    		placeholder={this.state.placeholderText}
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
							 					// console.log(chosenTags);
							 					if(chosenTags){
									 				// console.log(searchedDeals)
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
				
		
				<View style={{flex:1}}>

				{this.state.loadDeals ? 
						<View ref={el=>this.deals=el} style={{flex:1,height:500*k}}>

							<Combinator  me={'deals'}>
							{
								this.context.state$.map(state => {
									// console.log(state.dealsById, 'dealsById')
									return {chosenTags: state.chosenTags, searchedDeals: state.dealsByTags}
								}).
								map(
								// Observable.combineLatest(this.props.chosenTags$, this.props.searchedDeals$, this.props.dealsById$,
									({chosenTags,searchedDeals}) => {
										if (!chosenTags || !searchedDeals) {
											let result = {};
											if (this.chosenTags) {
												result.chosenTags = chosenTags
											}
											if (this.searchedDeals) {
												result.searchedDeals = searchedDeals
											}
											if (this.chosenTags || this.searchedDeals || this.dealsById) {
												return result
											}
											return this.searchedDeals = 'isLoading';
										}
										return {chosenTags, searchedDeals}
									}).map(({chosenTags,searchedDeals}) => {
										if (chosenTags) {
											this.chosenTags = chosenTags
											this.tagIdString = this.chosenTags.map(tag => tag.id).join(',')
										}
										if (searchedDeals) {
											this.searchedDeals = searchedDeals
										}
										if (this.searchedDeals === 'isLoading' || !this.dealsById) {
											return <Deals search={true}
												toggleSearch={this.toggleSearch.bind(this)}
												data={[]}/>
										}
										if(chosenTags && chosenTags.length>4){
											return <View style={{...center}}>
												<Text style={{margin:15,color:'gray',textAlign:'center'}}>К сожалению, мы ничего не нашли для Вашей комбинации тегов. Попробуйте другую комбинацию.</Text>
											</View>
										}
										if (this.dealsById) {
											this.data = _.values(this.searchedDeals[this.tagIdString]).map(path => this.dealsById[path[1]]).filter(x=>x)										
										} else {
											this.data = []
										}
										this.numberOfSearchedDeals = this.data.length
										return <Deals search={true}
											getMoreData={this.getMoreData.bind(this)}
											toggleSearch={this.toggleSearch.bind(this)}
											data={this.data}
										/>
									}
								)
							}
							</Combinator>
						</View>
					 : <View>
						<View ref={el=>this.suggestion=el} style={{height:500*k,flex:1}}> 
							<ScrollView keyboardShouldPersistTaps={true}>
								<Combinator me={'suggestion tags'}>
									<View style={{flexDirection:'row',flexWrap:'wrap',...center}}> 
										{
											Observable.combineLatest(this.props.searchedTags$, this.props.tagSearchText$, 
												(searchedTags, tagSearchText) =>{
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

