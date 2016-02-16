import {getQuery$} from './getQuery'
import {tagSearchText$} from './tagSearchText'
import {toggleTag$} from './toggleTag'
import {auth$} from './auth'
import {callQuery$} from './callQuery'
import {toggleItemToCart$} from './toggleItemToCart'
import {toggleNewDeal$} from './toggleNewDeal'
const intent = () => ({
	getQuery$,
	tagSearchText$,
	toggleTag$,
	auth$,
	callQuery$,
	toggleItemToCart$,
	toggleNewDeal$
})

export default intent;