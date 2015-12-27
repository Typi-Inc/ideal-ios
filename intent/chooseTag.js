import Rx from 'rx';

export const chooseTag$ = new Rx.ReplaySubject(1)

export const chooseTag = tag => chooseTag$.onNext(tag)