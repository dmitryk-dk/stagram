import {mutator, action} from 'satcheljs';
import getStore from '../store/store';
import formFieldChange from "../actions/formFieldChange";

mutator(formFieldChange, ({name, value}) => {
    const store = getStore();
    store[name] = value;
});

