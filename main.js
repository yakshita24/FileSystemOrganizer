#!/usr/bin/env node
let fs = require("fs");
let path = require("path");
let helpObj=require("./commands/help");
let organizeObj=require("./commands/organize");
let treeObj=require("./commands/tree");
let inputArr = process.argv.slice(2); //to take input from terminal (slices the input from 2nd index of "node file.js Hello world")

let command = inputArr[0];  //[ 'tree', 'directory path']
let dirpath = inputArr[1];


switch (command) {
    case "tree":
        treeObj.treeKey(dirpath);
        break;
    case "organize":
        organizeObj.organizeKey(dirpath);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please input right command!");
        break;
}

// node main.js organize "E:\Web Dev\FSO\src"