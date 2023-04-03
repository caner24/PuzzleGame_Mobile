"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isSquare;

function isSquare(n) {
  var i = Math.sqrt(n);
  return i >= 3 && Number.isInteger(i) && i * i === n;
}