import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the initial state
const initialState = {
  playerName: '',
  score: 0,
};

// Define the reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PLAYER_NAME':
      return {
        ...state,
        playerName: action.payload,
      };
    case 'INCREMENT_SCORE':
      return {
        ...state,
        score: state.score + action.payload,
      };
    default:
      return state;
  }
};

// Configure Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = createStore(persistedReducer);

// Create the persisted store
const persistedStore = persistStore(store);

export { store, persistedStore };
