import Rx from 'rx';

export const toggleItemToCart$ = new Rx.ReplaySubject(1)

export const toggleItemToCart = item => toggleItemToCart$.onNext(item)