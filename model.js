import Rx from 'rx';
import falcor from 'falcor';
import FalcorHttpDatasource from 'falcor-http-datasource';
import { Map, fromJS, List } from 'immutable';
import _ from 'lodash';
import store from 'react-native-simple-store'

const removeCircular = (json) => {
	return _.merge({}, json, (a, b) => {
		if (b && b['\u001eparent']) {
			delete b['\u001eparent']
		}
		if (b && b['\u001ekey']) {
			delete b['\u001ekey']
		}
	})
}

let model = ({ tagSearchText$, getQuery$, toggleTag$, auth$, callQuery$ }) => {
	let data$ = new Rx.ReplaySubject(1);
	data$.onNext({featuredDeals:'isLoading'})
	let state$ = data$.scan((accumulator, newData) => {
		if (newData.chosenTags) {
			return accumulator.merge(fromJS(newData))
		}
		return accumulator.mergeDeep(fromJS(removeCircular(newData)))
	}, Map())
	let rootModel = new falcor.Model({
		source: new FalcorHttpDatasource('http://localhost:9090/model.json'),
	});
	store.get('Auth0Token').then(token=>{
		if(token&&token.idToken){
			rootModel = new falcor.Model({
	  			source: new FalcorHttpDatasource('http://localhost:9090/model.json', {
	  				headers: {
	  					'Authorization': 'Bearer '+token.idToken
	  				}
	  			}),
			}).batch(20)
		}else{
		    rootModel = new falcor.Model({
	  			source: new FalcorHttpDatasource('http://localhost:9090/model.json'),
			})
		}
	})
	auth$.subscribe(idToken=>{
		let newModel;
		if(idToken){
			 newModel = new falcor.Model({
	  			source: new FalcorHttpDatasource('http://localhost:9090/model.json', {
	  				headers: {
	  					'Authorization': 'Bearer '+idToken
	  				}
	  			}),
	  			cache: rootModel.getCache(),
			});
			rootModel = newModel
		}else{
		    newModel = new falcor.Model({
	  			source: new FalcorHttpDatasource('http://localhost:9090/model.json'),
			});
			rootModel = newModel
		}
		
	})
	// rootModel.get(
	// 	// ['dealsById','23ad5fbc-a991-4cff-88bf-2ede82fcadc5','comments','sort:createdAt=desc', 'edges', {from: 0, to: 10}, ['text','id']],
	// 		// ['dealsById','23ad5fbc-a991-4cff-88bf-2ede82fcadc5','comments','sort:createdAt=desc', 'edges', {from: 0, to: 10}, 'author',['name','image']],
	// ).then(console.log)
			
	tagSearchText$.subscribe(text =>data$.onNext({'tagSearchText': text}))
	tagSearchText$.debounce(250).
		map(key=> {
			let result$ = Rx.Observable.fromPromise(
				rootModel.get(
					['tagsByText',key,{ from: 0, to : 40}, ['text','id'] ]
				)
			)//.delay(500)
			Rx.Observable.just(1).
				//delay(200).
				takeUntil(result$).subscribe(() => data$.onNext({tagsByText:'isLoading'}))
			return result$
		}).switchLatest().
		// filter(data => data && data.json).
		subscribe(data => data && data.json ? data$.onNext(data.json) : data$.onNext({tagsByText: 'not found' }))
	getQuery$.subscribe(paths => {
		if (paths[0].includes('certificates')) {
			data$.onNext({
				[paths[0][0]] : {
					[paths[0][1]]: {
						[paths[0][2]] : 'isLoading'
					}
				}
			})
		}
		if (paths[0].includes('comments')) {
			data$.onNext({
				[paths[0][0]] : {
					[paths[0][1]]: {
						[paths[0][2]] : 'isLoading'
					}
				}
			})
		}
		rootModel.get(...paths).then(data => {
			if (data && data.json) {
				if (data.json.featuredDeals) {
					const result = { featuredDeals: {}, dealsById: {} }
					Object.keys(data.json.featuredDeals).filter(x => !isNaN(x)).forEach(index => {
						const keysWithPathKeyInside = Object.keys(data.json.featuredDeals[index])
						const pathKey = keysWithPathKeyInside.filter(key => key.indexOf('path') > -1)[0]
						const path = data.json.featuredDeals[index][pathKey]
						result.featuredDeals[index] = path
						if (!result.dealsById[path[1]]) {
							result.dealsById[path[1]] = {}
						}
						_.merge(result.dealsById[path[1]], data.json.featuredDeals[index])
					})
					return data$.onNext(result)
				}
				if (data.json.dealsByTags) {
					const tagString = Object.keys(data.json.dealsByTags).
						filter(key => (key.indexOf('key') === -1) && (key.indexOf('parent') === -1))[0]
					const result = { dealsByTags: {}, dealsById: {} }
					result.dealsByTags[tagString] = {}
					const deals = data.json.dealsByTags[tagString]
					Object.keys(deals).filter(x => !isNaN(x)).forEach(index => {
						const keysWithPathKeyInside = Object.keys(deals[index])
						const pathKey = keysWithPathKeyInside.filter(key => key.indexOf('path') > -1)[0]
						const path = deals[index][pathKey]
						result.dealsByTags[tagString][index] = path
						if (!result.dealsById[path[1]]) {
							result.dealsById[path[1]] = {}
						}
						_.merge(result.dealsById[path[1]], deals[index])
					})
					return data$.onNext(result)
				}
				return data$.onNext(data.json)
			}
		})
	}
	)
	callQuery$.subscribe(args => rootModel.call(...args).then(data => data && data.json && data$.onNext(data.json)))

	toggleTag$.
	  scan((acc, nextTag) => {
	  	nextTag = nextTag.toJS()
	  	if(acc.filter(tag=>tag.id===nextTag.id).length>0){
	  		acc.splice(acc.indexOf(acc.filter(tag=>tag.id===nextTag.id)[0]),1)
	  		return acc
	  	}
		acc.unshift(nextTag)
		return acc
	}, []).map(tags => {
		data$.onNext({ chosenTags: tags, dealsByTags: 'isLoading' })
		let tagIdString=tags.length === 0 ? '' : tags.map(tag => tag.id).join(',');
		return Rx.Observable.fromPromise(rootModel.get(
			['dealsByTags',tagIdString,{from:0,to:9},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 9}, ['id','text']],
			['dealsByTags',tagIdString,{from:0,to:9},['title','conditions','id','image','discount','payout']],
			['dealsByTags',tagIdString,{from:0,to:9},'business',['name','image']],
			['dealsByTags',tagIdString,{from:0,to:9},'likes','sort:createdAt=desc','count'],
			['dealsByTags',tagIdString,{from:0,to:9},'likedByUser', '{{me}}']

		))
	})//.delay(100)
	.switchLatest().
	   subscribe(data => {
	   	if (data && data.json) {
			if (data.json.dealsByTags) {
				const tagString = Object.keys(data.json.dealsByTags).
					filter(key => (key.indexOf('key') === -1) && (key.indexOf('parent') === -1))[0]
				const result = { dealsByTags: {}, dealsById: {} }
				result.dealsByTags[tagString] = {}
				const deals = data.json.dealsByTags[tagString]
				Object.keys(deals).filter(x => !isNaN(x)).forEach(index => {
					const keysWithPathKeyInside = Object.keys(deals[index])
					const pathKey = keysWithPathKeyInside.filter(key => key.indexOf('path') > -1)[0]
					const path = deals[index][pathKey]
					result.dealsByTags[tagString][index] = path
					if (!result.dealsById[path[1]]) {
						result.dealsById[path[1]] = {}
					}
					_.merge(result.dealsById[path[1]], deals[index])
				})
				return data$.onNext(result)
			}
			return data$.onNext(data.json);
		}
	   })
	// state$.pluck('dealsById').filter(x=>x).pluck('9c2f19e1-452e-4f22-a4d3-bda10ec0ed64').filter(x => x).
	// 	pluck('likes').filter(x => x).
	// 	pluck(`where:idDeal=9c2f19e1-452e-4f22-a4d3-bda10ec0ed64,idLiker={{me}}`).filter(x => x).
	// 	pluck('count').
	// 	subscribe(x => console.log(x, '------------dealsById-------------'))
	// state$.pluck('dealsById').subscribe(x=>{
	// 	if (!x) {
	// 		console.log('dealsById are undefined')
	// 	}
	// 	if (x && x['c4df1b9a-ca35-42c9-8bdc-57b330bd4f21']) {
	// 		console.log(x['c4df1b9a-ca35-42c9-8bdc-57b330bd4f21'], 'here you go deal')
	// 	}	
	// })
	// state$.pluck('dealsById').filter(x=>x).
	// 	pluck('c4df1b9a-ca35-42c9-8bdc-57b330bd4f21').filter(x=>x).
	// 	pluck('certificates').filter(x=>x).subscribe(x => console.log(x, 'deal in stream'))
	// state$.pluck('dealsById').filter(x=>x).
	// 	pluck('c4df1b9a-ca35-42c9-8bdc-57b330bd4f21').
	// 	filter(x=>x).subscribe(x => console.log(x, 'deal in stream'))
	// state$.subscribe(x => console.log(x.dealsById, 'dealsById in stream'))
	// state$.subscribe(x => console.log(x, 'state'))
	return state$
}

export default model;
//'------------------------------------ test of merge concept of lodash'
// const data = {
// 	featuredDeals: {
// 		0: {
// 			title: 'hello'
// 		}
// 	}
// }

// const newData = {
// 	featuredDeals: 'isLoading'
// }

// console.log(_.merge(data, newData));

//'------------------------------------ test of merge concept of lodash'


// // state$.subscribe(console.log)
// export let searchTags$ = state$.pluck('tagSearchText').distinctUntilChanged().
// 		debounce(250).
// 		map(key=> {
// 			// console.log(key)
// 			currentText = key;
// 			let result$ = Rx.Observable.fromPromise(
// 				model.get(
// 					['tagsByText',key,{ from: 0, to : 20}, ['text','id'] ]
// 				)
// 			)//.delay(1000)
// 			// Rx.Observable.just(1).
// 				// delay(200).
// 				// takeUntil(result$).subscribe(() => data$.onNext({tagsByText:{isLoadingTags:true}}))
// 			return result$
// 		}).switchLatest().filter(data => data && data.json);

// 		let searchTagsSubscription = searchTags$.subscribe(data => data$.onNext(data.json))

// action$.subscribe(action => {
//   switch(action.type) {
// 	  case 'get':
// 	  	model.get(...action.value.path).then(data => data$.onNext(data.json));
// 	  	break;
// 	 //  case 'set': 
// 	 //  	model.set(...action.path, action.value);
// 	 //  	break;
// 	 //  case 'call': 
// 	 //  	model.call(...action.path, action.value).then(data =>
// 		//   	data$.onNext(deepAssign(data.json,{featuredDeals: { isFetching: false }})
// 	 //  	));
// 		// break;
	 
// 	  case 'tagSearchText':
// 	  	data$.onNext({tagSearchText:action.value})
	  	
// 	  	break;
//   }
// })

// // state$.subscribe(x => console.log('--------------------',x, 'THIS IS STATE'));

// export let getFeaturedDeals = (range) => {
// 	action$.onNext({
// 		type: 'get',
// 		value: {
// 			path:[
// 				['featuredDeals',range,'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, 'text'],
// 				['featuredDeals',range, ['title','conditions','id','image','discount']],
// 				['featuredDeals',range,'business',['name','image']],
// 				['featuredDeals',range,'likes','sort:createdAt=desc','count']
// 			]
// 		}
// 	})
// }

// export let onTagTextChange = (text) => {
// 	action$.onNext({
// 		type: 'tagSearchText',
// 		value: text
// 	})
// }