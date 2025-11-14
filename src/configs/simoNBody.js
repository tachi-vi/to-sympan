import { exp } from "numeric"

let configs = [
    {
  name: "N=4 Orbit",
  id: "n4-orbit",
  sim: "rk2",
  scale: 150,
  bodies: [
    { m: 1, x: 1.382857, y: 0, vx: 0, vy: 0.584873 },
    { m: 1, x: 0, y:0.157030, vx: 1.871935, vy: 0.157030 },
    { m: 1, x:-1.382857, y: 0, vx: 0, vy: -0.584873 },
    { m: 1, x: 0, y: -0.157030, vx: -1.871935, vy: 0 },
  ],
},
{
  name: "N=5 Orbit",
  id: "n5-orbit",
  sim: "rk2",
  scale: 150,
  bodies: [
    { m: 1, x: 0, y: 0, vx: 0, vy: 0 },
    { m: 1, x: 0.439775, y: -0.169717, vx: 1.822785, vy: 0.128248 },
    { m: 1, x: -1.268608, y: -0.267651, vx: 1.271564, vy: -0.168645 },
    { m: 1, x: 1.268608, y:0.267651, vx: -1.271564, vy: -0.168645 },
    { m: 1, x: 0.439775, y: 0.169717, vx: -1.822785, vy:  0.128248 },
  ],

}]

export default configs;