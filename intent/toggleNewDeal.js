import Rx from 'rx';

export const toggleNewDeal$ = new Rx.ReplaySubject(1)

export const toggleNewDeal= item => toggleNewDeal$.onNext(item)