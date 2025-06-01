const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SupplyChain", function () {
  let supplyChain;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
    supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();
  });

  it("Should assign deployer as authorized", async function () {
    expect(await supplyChain.authorizedEntities(owner.address)).to.equal(true);
  });

  it("Should add a product", async function () {
    await supplyChain.addProduct("Item1", "Factory1");
    const product = await supplyChain.getProduct(1);
    expect(product.id).to.equal(1);
    expect(product.name).to.equal("Item1");
    expect(product.origin).to.equal("Factory1");
    expect(product.owner).to.equal(owner.address);
  });

  it("Should update status", async function () {
    await supplyChain.addProduct("Item1", "Factory1");
    await supplyChain.updateStatus(1, 2);
    const history = await supplyChain.getProductHistory(1);
    expect(history[1].status).to.equal(2);
  });

  it("Should transfer ownership", async function () {
    await supplyChain.addProduct("Item1", "Factory1");
    await supplyChain.transferProductOwnership(1, addr1.address);
    const product = await supplyChain.getProduct(1);
    expect(product.owner).to.equal(addr1.address);
  });
});
