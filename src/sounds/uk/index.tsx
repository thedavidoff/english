// function importAll(r: any) {
//   let sounds: any = {};
//   r.keys().map((item: any) => (sounds[item.replace("./", "")] = r(item)));
//   return sounds;
// }
// const uk: any = importAll(require.context("./"));
// console.log(uk);

const UK: {[key: string]: string} = {
  have: require("./have.mp3").default,
  has: require("./has.mp3").default,
};

export default UK;