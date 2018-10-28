// @flow

import { makeAction } from './ActionEmitter';
import type { Action } from './ActionEmitter';
import type { UpdateStep } from './Inputs';


export const LifecycleActions = {
  INITIALIZE: (makeAction('LIFECYCLE_ACTION_INITIALIZE'): Action<void>),
  PRE_UPDATE: (makeAction('LIFECYCLE_ACTION_PRE_UPDATE'): Action<UpdateStep>),
  FIXED_UPDATE: (makeAction('LIFECYCLE_FIXED_UPDATE'): Action<UpdateStep>),
  UPDATE: (makeAction('LIFECYCLE_ACTION_UPDATE'): Action<UpdateStep>),
  POST_UPDATE: (makeAction('LIFECYCLE_ACTION_POST_UPDATE'): Action<UpdateStep>),
};

const test = [2,3,
4,4,5];