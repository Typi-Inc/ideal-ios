import {getQuery$} from './getQuery'
import {tagSearchText$} from './tagSearchText'
import {toggleTag$} from './toggleTag'
import {auth$} from './auth'
import {callQuery$} from './callQuery'

const intent = () => ({
	getQuery$,
	tagSearchText$,
	toggleTag$,
	auth$,
	callQuery$
})

export default intent;