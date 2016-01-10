import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import { Observable } from 'rx'
import Deals from './deals'
import {getFeaturedDeals} from '../model'
import {getQuery} from '../intent/getQuery';
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class FeaturedDealsTab extends React.Component{
	componentWillMount() {
		getQuery([
			['featuredDeals',{from:0,to:10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, 'text'],
			['featuredDeals',{from:0,to:10}, ['title','conditions','id','image','discount']],
			['featuredDeals',{from:0,to:10},'business',['name','image']],
			['featuredDeals',{from:0,to:10},'likes','sort:createdAt=desc','count'],
			['featuredDeals',{from:0,to:10},'likedByUser', '{{me}}']
		])
	}

	getMoreData(){
		getQuery([
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, 'text'],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10}, ['title','conditions','id','image','discount']],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'business',['name','image']],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'likes','sort:createdAt=desc','count'],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'likedByUser', '{{me}}']
		])
	}
	render(){
		return (
			<Combinator>
				<View style={{flex:1}}>
					{
						Observable.combineLatest(this.props.featuredDeals$, this.props.dealsById$, (featuredDeals, dealsById) => {
							if (!dealsById || !featuredDeals) {
								return <Deals
									data={[]}/>
							}
							return {featuredDeals, dealsById}
						}).filter(x => x).map(({featuredDeals, dealsById}) => {
							this.deals = _.values(featuredDeals).map(path => dealsById[path[1]])
							return <Deals getMoreData={this.getMoreData.bind(this)}  data={this.deals} />
						})
					}
				</View>
			</Combinator>
		)

	}
}

Object.assign(FeaturedDealsTab.prototype, TimerMixin);
