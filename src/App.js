import React, { useEffect } from 'react';
import store from "./store";
import { Provider } from "react-redux";

import RootNavigator from './navigator/RootNavigator'

export default function App() {

    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    )
}