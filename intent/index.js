import {getQuery$} from './getQuery'
import {tagSearchText$} from './tagSearchText'
import {toggleTag$} from './toggleTag'
import {auth$} from './auth'
import {callQuery$} from './callQuery'
import {toggleItemToCart$} from './toggleItemToCart'

const intent = () => ({
	getQuery$,
	tagSearchText$,
	toggleTag$,
	auth$,
	callQuery$,
	toggleItemToCart$,
})

export default intent;