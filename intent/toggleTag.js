import Rx from 'rx';

export const toggleTag$ = new Rx.ReplaySubject(1)

export const toggleTag = tag => toggleTag$.onNext(tag)