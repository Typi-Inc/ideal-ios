import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import { ReplaySubject, Observable } from 'rx';
import Combinator from './combinator'
import Deals from './deals'
import FindTab from './findTab'
import {model,data$} from '../model'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class FindTabContainer extends React.Component{
	state = {
		placeholderText:'Искать по тегам',
		searchedTags: [],
		isLoadingTags: false,
		searchedDeals: [],
		loadDeals: false,
		loadingTagsError: null,
		loadingSearchedDealsError: null,
		chosenTags: []
	}
	componentWillMount() {
		this.text$ = new ReplaySubject(1);
		let currentText;


		this.searchTags$ = this.text$.
			debounce(250).
			map(key=> {
				currentText = key;
				let result$ = Observable.fromPromise(
					model.get(
						['tagsByText',key,{ from: 0, to : 20}, ['text','id'] ]
					)
				)//.delay(1000)
				Observable.just(1).
					// delay(200).
					takeUntil(result$).subscribe(() => this.setState({isLoadingTags: true}))
				return result$
			}).switchLatest();

			this.searchTagsSubscription = this.searchTags$.map(data => data && data.json ? data.json : {tagsByText : {'' : []}}).
			map(json => json.tagsByText[currentText || '']).
			subscribe(tags => this.setState({
				searchedTags:_.values(tags).filter(tag=>tag && tag.text),
				isLoadingTags: false,
			}))
	}

	componentWillUnmount() {
		this.searchTagsSubscription.dispose()
	}

	chooseTag(tag) {
		const tagIdString = this.state.chosenTags.concat([tag]).map(tag => tag.id).join(',');
		console.log(tagIdString);
		this.setState({
			loadDeals: false,
		})
		Observable.fromPromise(model.get(
			['dealsByTags',tagIdString,{from:0,to:10},'tags','sort:createdAt=desc','edges',{from: 0, to: 10},'text'],
			['dealsByTags',tagIdString,{from:0,to:10},['title','conditions','id','image','discount','payout']],
			['dealsByTags',tagIdString,{from:0,to:10},'business',['name','image']],
			['dealsByTags',tagIdString,{from:0,to:10},'likes','sort:createdAt=desc','count']
		)).subscribe(data => {
			// console.log(data);
			const json = data && data.json ? data.json : {dealsByTags : {'' : []}};
			const deals = json.dealsByTags[tagIdString || ''];
			this.setState({
				searchedDeals:_.values(deals).filter(deal => deal && deal.title),
				loadDeals: true,
				placeholderText:'Добавить больше тегов',
				chosenTags: this.state.chosenTags.concat([tag])
			})
		})
		this.onTextChange('');
		this.main.cancel()
	}
	cancelTag(tag){
		// this.setState({chosenTags:this.state.chosenTags,
		// 	tagCount:this.state.tagCount-1,loadDeals:this.state.tagCount>1?true:false,
		// 	placeholderText:this.state.tagCount>1?'Добавить еще таг':'Искать по тагам'
		// })	
		if (this.state.chosenTags.length < 2) {
			this.setState({
				searchedDeals:[],
				loadDeals: false,
				placeholderText:'Искать по тегам',
				chosenTags: []
			})
		}
		// this.setState({
		// 	loadDeals: false,
		// })
		const tagIdString = this.state.chosenTags.filter(t=>t.id!==tag.id).map(tag => tag.id).join(',');

		console.log(tagIdString);
		Observable.fromPromise(model.get(
			['dealsByTags',tagIdString,{from:0,to:10},'tags','sort:createdAt=desc','edges',{from: 0, to: 10},'text'],
			['dealsByTags',tagIdString,{from:0,to:10},['title','conditions','id','image','discount','payout']],
			['dealsByTags',tagIdString,{from:0,to:10},'business',['name','image']],
			['dealsByTags',tagIdString,{from:0,to:10},'likes','sort:createdAt=desc','count']
		)).subscribe(data => {
			// console.log(data);
			const json = data && data.json ? data.json : {dealsByTags : {'' : []}};
			const deals = json.dealsByTags[tagIdString || ''];
			this.setState({
				searchedDeals:_.values(deals).filter(deal => deal && deal.title),
				loadDeals: false,
				chosenTags:this.state.chosenTags.filter(t=>t.id!==tag.id)
			}
			,()=>this.setState({loadDeals:this.state.chosenTags.length>0?true:false})
			)
		})
	}

	loadDealsFalse() {
		this.setState({
			loadDeals: false
		})
	}

	onTextChange(text) {
		this.text$.onNext(text);
	}

	render(){
		// this.props.featuredDeals$.map(deals => console.log(deals) || deals)
		// console.log(this.state.deals);
		return (
			<FindTab ref={el=>this.main=el}
				searchedTags={this.state.searchedTags}
				searchedDeals={this.state.searchedDeals}
				chooseTag={this.chooseTag.bind(this)}
				chosenTags={this.state.chosenTags}
				cancelTag={this.cancelTag.bind(this)}
				loadDeals={this.state.loadDeals}
				placeholderText={this.state.placeholderText}
				loadDealsFalse={this.loadDealsFalse.bind(this)}
				onTextChange={this.onTextChange.bind(this)}
				isLoadingTags={this.state.isLoadingTags}
			/>
		)
	}


}

Object.assign(FindTabContainer.prototype, TimerMixin);

