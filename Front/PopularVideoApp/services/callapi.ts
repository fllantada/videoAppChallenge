import axios from "axios";

export async function newGame(
  payload: {
    id: string;
    name: string;
  },
  setUser: any
): Promise<any> {
  const response = await axios.post(
    `https://casinoserver-production.up.railway.app/game/newGame`,
    payload
  );

  setUser(response.data);
}

export async function spin(
  user: { id: string },
  setUser: any,
  setOne: any,
  setTwo: any,
  setThree: any
): Promise<any> {
  const { id } = user;
  const { data } = await axios.get(
    `https://casinoserver-production.up.railway.app/game/play/${id}`
  );
  setOne("Spining");
  setTwo("Spining");
  setThree("Spining");
  await Delay(1000);
  await setOne(data.playResults[0]);
  await Delay(1000);
  await setTwo(data.playResults[1]);
  await Delay(1000);
  await setThree(data.playResults[2]);

  setUser(data.player);
}

export async function buy(user: { id: string }, setUser: any) {
  const { id } = user;
  const { data } = await axios.get(
    `https://casinoserver-production.up.railway.app/game/buy/${id}`
  );

  setUser(data.player);
}

export async function checkout(id: string) {
  const response = await axios.get(
    `https://casinoserver-production.up.railway.app/game/checkout/${id}`
  );
  return response.data;
}
//set remote url github ?

const Delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
