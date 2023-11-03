import {configureStore} from "@reduxjs/toolkit"
import reducer from "../Redux/Reducer"
export const store = configureStore({ reducer: reducer });
