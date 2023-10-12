import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchWeather } from "./asyncActions";
import { IWeatherResponse, IWeatherSliceState, Status } from "./types";

//const initWeatherData = {
//  location: {
//    name:"",
//    localtime:""
//  },
//  current:{
//    temp_c:0,
//    last_updated:"",
//    time:"",
//    condition: {
//      icon:""
//    },
//    feelslike_c:0,
//    humidity:0,
//    wind_kph:0,
//    pressure_mb:0,
//    uv:0
//  },
//  forecast: {
//    forecastday:[]
//  }
//}

const initialState: IWeatherSliceState = {
  status: Status.LOADING,
  weatherData: {} as IWeatherResponse,
  city: "Miami"
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers:{
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.status = Status.LOADING;
      state.weatherData = {} as IWeatherResponse
    });

    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.weatherData = action.payload;
    });

    builder.addCase(fetchWeather.rejected, (state) => {
      state.status = Status.ERROR;
      state.weatherData =  {} as IWeatherResponse;
      state.city = ""
    });
  },
})

export const { changeCity} = weatherSlice.actions

export default weatherSlice.reducer