import { JOURNEY_DATA} from "../constants/action-types";
export function journeyData(payload) {
  console.log("dispatching the action")
  return { type: JOURNEY_DATA, payload };
}