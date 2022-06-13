const { create } = require("ipfs-http-client");

const ipfs = create("https://ipfs.infura.io:5001");

async function run() {
  const files = [{
    path: '/',
    content: JSON.stringify({
      name: "Maxja Test",
      image: "https://gateway.pinata.cloud/ipfs/QmbEd5oKScYVd5faJ39HxikpKJyUsVetYh3EHdmZrzqyap",
      description: "Maxja test airdrop NFT"
    })
  }];

  const result = await ipfs.add(files);
  console.log(result);
}

run();