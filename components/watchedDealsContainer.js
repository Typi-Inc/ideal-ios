import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import Deals from './deals'
import {model} from '../model'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class WatchedDealsContainer extends React.Component{
	state = {
		deals: [],
		error: null,
	}
	
	componentDidMount() {
		this.getFromModel([
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text'],
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10}, ['title','conditions','id','image','discount']],
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10},'business',['name','image']],
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10},'likes','sort:createdAt=desc','count']
		])
	}

	getMoreDeals() {
		this.getFromModel([
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'text'],
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10}, ['title','conditions','id','image','discount']],
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10},'business',['name','image']],
			['featuredDeals',{ from: this.state.deals.length, to : this.state.deals.length+10},'likes','sort:createdAt=desc','count']
		])
	}

	getFromModel(paths) {
		model.get(...paths).subscribe(data => {
			const deals = _.values(data.json.featuredDeals).filter(deal => deal && deal.title);
			this.setState({
				deals: this.state.deals.concat(deals)
			});
		}, err => {
			this.setState({
				error: true
			})
		});

	}

	render(){
		// this.props.featuredDeals$.map(deals => console.log(deals) || deals)
		return (
			<Deals data={this.state.deals} getMoreData={this.getMoreDeals.bind(this)}/>
		)
	}


}

Object.assign(WatchedDealsContainer.prototype, TimerMixin);

// <Deals data={_.values(deals).filter(x=>x.title)}/>
				   
