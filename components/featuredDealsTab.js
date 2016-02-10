import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import { Observable } from 'rx'
import Deals from './deals'
import {getFeaturedDeals} from '../model'
import {getQuery} from '../intent/getQuery';
import { List } from 'immutable'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class FeaturedDealsTab extends React.Component {
	static contextTypes={
    	state$: React.PropTypes.any
  	}
	componentWillMount() {
		getQuery([
			['featuredDeals',{from:0,to:4}, ['title','conditions','id','image','discount']],
			['featuredDeals',{from:0,to:4},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, ['id', 'text']],
			
			['featuredDeals',{from:0,to:4},'business',['name','image']],
			['featuredDeals',{from:0,to:4},'likes','sort:createdAt=desc','count'],
			['featuredDeals',{from:0,to:4},'likedByUser', '{{me}}']
		])
	}
	getMoreData(){
		getQuery([
			['featuredDeals',{from:this.size,to:this.size+4}, ['title','conditions','id','image','discount']],
			['featuredDeals',{from:this.size,to:this.size+4},'business',['name','image']],
			['featuredDeals',{from:this.size,to:this.size+4},'likes','sort:createdAt=desc','count'],
			['featuredDeals',{from:this.size,to:this.size+4},'likedByUser', '{{me}}'],
			['featuredDeals',{from:this.size,to:this.size+4},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, ['id', 'text']],

		])
	}
	render(){
		return (
			<Combinator>
				<View style={{flex:1}}>
					{
						this.context.state$.
							map(state => {
								let dealsById = state.get('dealsById')
								let featuredDeals = state.get('featuredDeals')
								if (!featuredDeals || featuredDeals === 'isLoading') {
									return <Deals data={List()} />
								}
								let deals = featuredDeals.valueSeq().map(path => dealsById.get(path.get(1))).toList()
								this.size = deals.size
								return <Deals status={'featured tab status'} getMoreData={this.getMoreData.bind(this)} data={deals} />
							})
					}
				</View>
			</Combinator>
		)

	}
}

Object.assign(FeaturedDealsTab.prototype, TimerMixin);
