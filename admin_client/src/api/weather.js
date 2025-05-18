import { ajax } from "./ajax";
import { weather, ipAreaCoordJson } from "./urls/weather";

export const getWeather = (data) => ajax(weather, data, "GET");
export const getIpAreaCoordJson = (data) => ajax(ipAreaCoordJson, data, "GET");
