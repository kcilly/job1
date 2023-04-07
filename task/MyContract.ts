import { task } from "hardhat/config";
// import { ethers } from "hardhat";
import { readAddressList } from "../scripts/helper";

task("MyContract", "getvalue and setvalue with MyContract v1").setAction(async (_, hre) => {
  const { deployments, getNamedAccounts, network } = hre;
  //和v1 版本交互，调用的是proxy合约
  const addressList = readAddressList();
  const proxyAddress = addressList[network.name].MyContract;
  //链接合约
  const MyContract = await hre.ethers.getContractAt("MyContract", proxyAddress);

  //查看当前的value 值
  console.log("当前值: ", await MyContract.getValue());

  //设置一个新的value值
  console.log("设置值为888: ", await MyContract.setValue(888));

  console.log("当前值: ", await MyContract.getValue());
  //获取当前版本

  console.log("当前版本: ", await MyContract.version());
});

