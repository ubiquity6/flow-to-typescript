// @flow

import { makeAction } from './ActionEmitter';
import { Action } from './ActionEmitter';
import { UpdateStep } from './Inputs';


export const LifecycleActions = {
  INITIALIZE: makeAction('LIFECYCLE_ACTION_INITIALIZE') as Action<void>,
  PRE_UPDATE: makeAction('LIFECYCLE_ACTION_PRE_UPDATE') as Action<UpdateStep>,
  FIXED_UPDATE: makeAction('LIFECYCLE_FIXED_UPDATE') as Action<UpdateStep>,
  UPDATE: makeAction('LIFECYCLE_ACTION_UPDATE') as Action<UpdateStep>,
  POST_UPDATE: makeAction('LIFECYCLE_ACTION_POST_UPDATE') as Action<UpdateStep>,
};

const test = [2,3,
4,4,5];