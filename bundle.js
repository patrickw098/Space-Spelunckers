/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascript/space_spelunkers.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/caverns.js":
/*!*******************************!*\
  !*** ./javascript/caverns.js ***!
  \*******************************/
/*! exports provided: generateMap, drawMap, turmitesNTimes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"generateMap\", function() { return generateMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawMap\", function() { return drawMap; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"turmitesNTimes\", function() { return turmitesNTimes; });\n\n\nconst createMap = (width, height) => {\n  const chanceToStartAlive = 0.38;\n  const map = [];\n\n    for( let x = 0; x < width; x++ ){\n      map[x] = []\n        for( let y = 0; y < height; y++ ){\n          let row = map[x];\n\n          if (Math.random() < chanceToStartAlive) {\n            row.push(true);\n          } else {\n            row.push(false);\n          }\n\n        }\n    }\n    return map;\n}\n\n\nconst doSimulationStep = (oldMap) => {\n  const birthLimit = 4;\n  const deathLimit = 3;\n  const newMap = [];\n\n  for (let x = 0; x < oldMap.length; x++ ) {\n    newMap[x] = [];\n\n    for ( let y = 0; y < oldMap[0].length; y++ ) {\n      let neighbors = countAliveNeighbors(oldMap, x, y);\n      let row = newMap[x];\n\n      // If oldMap[x][y] is true, it means the cell is alive and we want to check\n      // whether or not we shoudl keep it alive depending on the number of\n      // alive neighbors it has.\n      if ( oldMap[x][y] ) {\n        if ( neighbors < deathLimit ) {\n          row.push(false);\n        } else {\n          row.push(true);\n        }\n      // else do the opposite for dead cells.\n      } else {\n        if ( neighbors > birthLimit ) {\n          row.push(true);\n        } else {\n          row.push(false);\n        }\n      }\n    }\n  }\n\n  return newMap;\n}\n\nconst doStepNumTimes = (num) => {\n  let map = createMap(50,50);\n\n  for ( let i = 0; i < num; i++ ) {\n    map = doSimulationStep(map);\n  }\n\n  return map;\n}\n\nconst printMap = (map) => {\n  for ( let i = 0; i < map.length; i++ ) {\n    let row = map[i];\n\n    let printedRow = row.map( (col) => {\n      if ( col ) {\n        return \" \";\n      } else {\n        return \"x\";\n      }\n    })\n\n    printedRow = printedRow.join(\"\")\n\n    console.log(printedRow)\n  }\n}\n\nconst countAliveNeighbors = (map, x, y) => {\n  let count = 0;\n\n  for (let i = -1; i < 2; i++) {\n    for (let j = -1; j < 2; j ++) {\n      let adjX = x + i;\n      let adjY = y + j;\n\n      if ( i === 0 && y === 0 ) {\n        continue;\n      } else if ( outOfBounds(map, adjX, adjY) ) {\n        count += 0;\n      } else if ( map[adjX][adjY] ) {\n        count += 1;\n      }\n    }\n  }\n\n  return count;\n}\n\nconst outOfBounds = (map, adjX, adjY) => {\n  return adjX < 0 || adjX >= map.length || adjY < 0 || adjY >= map[0].length\n}\n\nconst countFill = (x,y,map,color) => {\n  if ( outOfBounds(map, x, y) || map[x][y] === color ) return;\n  if ( !map[x][y] ) return;\n\n  map[x][y] = color\n\n  countFill(x, y+1, map, color);\n  countFill(x, y-1, map, color);\n  countFill(x-1, y, map, color);\n  countFill(x+1, y, map, color);\n\n  return;\n}\n\nconst count = map => {\n  let counter = 0;\n\n  for (let i = 0; i < map.length; i++ ) {\n    for (let j = 0; j< map.length; j++ ) {\n      if ( map[i][j] === \"empty\" ) {\n        map[i][j] = true;\n        counter += 1;\n      }\n    }\n  }\n\n  return counter;\n}\n\n\nconst generateMap = () => {\n  let map = doStepNumTimes(10);\n  let maxCounter = 0;\n  let startSpace = [];\n\n  for (let i = 0; i < map.length; i++ ) {\n    for (let j = 0; j< map.length; j++ ) {\n      countFill(i,j,map,\"empty\");\n      let num = count(map);\n\n      if ( num > maxCounter ) {\n        maxCounter = num;\n        startSpace = [i,j];\n      }\n    }\n  }\n\n  return maxCounter > 1100 && maxCounter < 1700 ? [map, startSpace] : generateMap()\n}\n\nconst drawMap = (map) => {\n  const rootEl = document.getElementById(\"canvas\");\n  const grid = document.createDocumentFragment();\n\n  for ( let i = 0; i < map.length; i++ ) {\n    let row = document.createElement('div');\n    row.classList.add(`row`);\n\n    for ( let j = 0; j < map[i].length; j++ ) {\n      let col = document.createElement('div');\n      col.classList.add(`col`);\n\n      if ( map[i][j] ) {\n        col.classList.add('empty');\n      } else {\n        col.classList.add('wall');\n      }\n\n      row.append(col);\n    }\n\n    grid.append(row);\n  }\n\n  rootEl.append(grid);\n}\n\nconst turmitesNTimes = (times) => {\n  let grid = squareGrid(150);\n  let x = 75;\n  let y = 75;\n  let state = 0;\n  let dirX = - 1;\n  let dirY = 0;\n\n  for ( let i = 0; i < times; i++ ) {\n    [x, y, grid, dirX, dirY, state] = turmites(...[x, y, grid, dirX, dirY, state]);\n  }\n\n  return grid;\n}\n\nconst squareGrid = (n) => {\n  let grid = new Array(n);\n\n  for ( let i = 0; i < grid.length; i++ ) {\n    grid[i] = new Array(n);\n    for (let j = 0; j < grid[i].length; j++ ) {\n      grid[i][j] = true;\n    }\n  }\n\n  return grid;\n}\n\nconst turmites = (x, y, grid, dirX, dirY, state) => {\n\n  if ( outOfBounds(grid, x, y) ) {\n    return \"error\"\n  } else if ( grid[x][y] === true && state === 0 ){\n    grid[x][y] = false;\n    [dirX, dirY] = ninetyDegreesRight(dirX, dirY);\n    state = 0;\n    return [x + dirX, y + dirY, grid, dirX, dirY, state]\n  } else if ( grid[x][y] === true && state === 1 ) {\n    grid[x][y] = true;\n    state = 0;\n    return [x + dirX, y + dirY, grid, dirX, dirY, state]\n  } else if ( grid[x][y] === false && state === 0 ) {\n    grid[x][y] = false;\n    [dirX, dirY] = ninetyDegreesRight(dirX, dirY);\n    state = 1;\n    return [x + dirX, y + dirY, grid, dirX, dirY, state]\n  } else {\n    grid[x][y] = true;\n    state = 1;\n    return [x + dirX, y + dirY, grid, dirX, dirY, state]\n  }\n}\n\nconst ninetyDegreesRight = (dirX, dirY) => {\n  if ( dirX === 0 ) {\n    return [dirY, 0]\n  } else {\n    return [0, -dirX ]\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L2NhdmVybnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L2NhdmVybnMuanM/ZDU0YyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuY29uc3QgY3JlYXRlTWFwID0gKHdpZHRoLCBoZWlnaHQpID0+IHtcbiAgY29uc3QgY2hhbmNlVG9TdGFydEFsaXZlID0gMC4zODtcbiAgY29uc3QgbWFwID0gW107XG5cbiAgICBmb3IoIGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KysgKXtcbiAgICAgIG1hcFt4XSA9IFtdXG4gICAgICAgIGZvciggbGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KysgKXtcbiAgICAgICAgICBsZXQgcm93ID0gbWFwW3hdO1xuXG4gICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCBjaGFuY2VUb1N0YXJ0QWxpdmUpIHtcbiAgICAgICAgICAgIHJvdy5wdXNoKHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cucHVzaChmYWxzZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn1cblxuXG5jb25zdCBkb1NpbXVsYXRpb25TdGVwID0gKG9sZE1hcCkgPT4ge1xuICBjb25zdCBiaXJ0aExpbWl0ID0gNDtcbiAgY29uc3QgZGVhdGhMaW1pdCA9IDM7XG4gIGNvbnN0IG5ld01hcCA9IFtdO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDwgb2xkTWFwLmxlbmd0aDsgeCsrICkge1xuICAgIG5ld01hcFt4XSA9IFtdO1xuXG4gICAgZm9yICggbGV0IHkgPSAwOyB5IDwgb2xkTWFwWzBdLmxlbmd0aDsgeSsrICkge1xuICAgICAgbGV0IG5laWdoYm9ycyA9IGNvdW50QWxpdmVOZWlnaGJvcnMob2xkTWFwLCB4LCB5KTtcbiAgICAgIGxldCByb3cgPSBuZXdNYXBbeF07XG5cbiAgICAgIC8vIElmIG9sZE1hcFt4XVt5XSBpcyB0cnVlLCBpdCBtZWFucyB0aGUgY2VsbCBpcyBhbGl2ZSBhbmQgd2Ugd2FudCB0byBjaGVja1xuICAgICAgLy8gd2hldGhlciBvciBub3Qgd2Ugc2hvdWRsIGtlZXAgaXQgYWxpdmUgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2ZcbiAgICAgIC8vIGFsaXZlIG5laWdoYm9ycyBpdCBoYXMuXG4gICAgICBpZiAoIG9sZE1hcFt4XVt5XSApIHtcbiAgICAgICAgaWYgKCBuZWlnaGJvcnMgPCBkZWF0aExpbWl0ICkge1xuICAgICAgICAgIHJvdy5wdXNoKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cucHVzaCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgLy8gZWxzZSBkbyB0aGUgb3Bwb3NpdGUgZm9yIGRlYWQgY2VsbHMuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIG5laWdoYm9ycyA+IGJpcnRoTGltaXQgKSB7XG4gICAgICAgICAgcm93LnB1c2godHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93LnB1c2goZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld01hcDtcbn1cblxuY29uc3QgZG9TdGVwTnVtVGltZXMgPSAobnVtKSA9PiB7XG4gIGxldCBtYXAgPSBjcmVhdGVNYXAoNTAsNTApO1xuXG4gIGZvciAoIGxldCBpID0gMDsgaSA8IG51bTsgaSsrICkge1xuICAgIG1hcCA9IGRvU2ltdWxhdGlvblN0ZXAobWFwKTtcbiAgfVxuXG4gIHJldHVybiBtYXA7XG59XG5cbmNvbnN0IHByaW50TWFwID0gKG1hcCkgPT4ge1xuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKysgKSB7XG4gICAgbGV0IHJvdyA9IG1hcFtpXTtcblxuICAgIGxldCBwcmludGVkUm93ID0gcm93Lm1hcCggKGNvbCkgPT4ge1xuICAgICAgaWYgKCBjb2wgKSB7XG4gICAgICAgIHJldHVybiBcIiBcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInhcIjtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcHJpbnRlZFJvdyA9IHByaW50ZWRSb3cuam9pbihcIlwiKVxuXG4gICAgY29uc29sZS5sb2cocHJpbnRlZFJvdylcbiAgfVxufVxuXG5jb25zdCBjb3VudEFsaXZlTmVpZ2hib3JzID0gKG1hcCwgeCwgeSkgPT4ge1xuICBsZXQgY291bnQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAtMTsgaSA8IDI7IGkrKykge1xuICAgIGZvciAobGV0IGogPSAtMTsgaiA8IDI7IGogKyspIHtcbiAgICAgIGxldCBhZGpYID0geCArIGk7XG4gICAgICBsZXQgYWRqWSA9IHkgKyBqO1xuXG4gICAgICBpZiAoIGkgPT09IDAgJiYgeSA9PT0gMCApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKCBvdXRPZkJvdW5kcyhtYXAsIGFkalgsIGFkalkpICkge1xuICAgICAgICBjb3VudCArPSAwO1xuICAgICAgfSBlbHNlIGlmICggbWFwW2FkalhdW2FkalldICkge1xuICAgICAgICBjb3VudCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb3VudDtcbn1cblxuY29uc3Qgb3V0T2ZCb3VuZHMgPSAobWFwLCBhZGpYLCBhZGpZKSA9PiB7XG4gIHJldHVybiBhZGpYIDwgMCB8fCBhZGpYID49IG1hcC5sZW5ndGggfHwgYWRqWSA8IDAgfHwgYWRqWSA+PSBtYXBbMF0ubGVuZ3RoXG59XG5cbmNvbnN0IGNvdW50RmlsbCA9ICh4LHksbWFwLGNvbG9yKSA9PiB7XG4gIGlmICggb3V0T2ZCb3VuZHMobWFwLCB4LCB5KSB8fCBtYXBbeF1beV0gPT09IGNvbG9yICkgcmV0dXJuO1xuICBpZiAoICFtYXBbeF1beV0gKSByZXR1cm47XG5cbiAgbWFwW3hdW3ldID0gY29sb3JcblxuICBjb3VudEZpbGwoeCwgeSsxLCBtYXAsIGNvbG9yKTtcbiAgY291bnRGaWxsKHgsIHktMSwgbWFwLCBjb2xvcik7XG4gIGNvdW50RmlsbCh4LTEsIHksIG1hcCwgY29sb3IpO1xuICBjb3VudEZpbGwoeCsxLCB5LCBtYXAsIGNvbG9yKTtcblxuICByZXR1cm47XG59XG5cbmNvbnN0IGNvdW50ID0gbWFwID0+IHtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrICkge1xuICAgIGZvciAobGV0IGogPSAwOyBqPCBtYXAubGVuZ3RoOyBqKysgKSB7XG4gICAgICBpZiAoIG1hcFtpXVtqXSA9PT0gXCJlbXB0eVwiICkge1xuICAgICAgICBtYXBbaV1bal0gPSB0cnVlO1xuICAgICAgICBjb3VudGVyICs9IDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvdW50ZXI7XG59XG5cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlTWFwID0gKCkgPT4ge1xuICBsZXQgbWFwID0gZG9TdGVwTnVtVGltZXMoMTApO1xuICBsZXQgbWF4Q291bnRlciA9IDA7XG4gIGxldCBzdGFydFNwYWNlID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKysgKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGo8IG1hcC5sZW5ndGg7IGorKyApIHtcbiAgICAgIGNvdW50RmlsbChpLGosbWFwLFwiZW1wdHlcIik7XG4gICAgICBsZXQgbnVtID0gY291bnQobWFwKTtcblxuICAgICAgaWYgKCBudW0gPiBtYXhDb3VudGVyICkge1xuICAgICAgICBtYXhDb3VudGVyID0gbnVtO1xuICAgICAgICBzdGFydFNwYWNlID0gW2ksal07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1heENvdW50ZXIgPiAxMTAwICYmIG1heENvdW50ZXIgPCAxNzAwID8gW21hcCwgc3RhcnRTcGFjZV0gOiBnZW5lcmF0ZU1hcCgpXG59XG5cbmV4cG9ydCBjb25zdCBkcmF3TWFwID0gKG1hcCkgPT4ge1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgY29uc3QgZ3JpZCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBtYXAubGVuZ3RoOyBpKysgKSB7XG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKGByb3dgKTtcblxuICAgIGZvciAoIGxldCBqID0gMDsgaiA8IG1hcFtpXS5sZW5ndGg7IGorKyApIHtcbiAgICAgIGxldCBjb2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbC5jbGFzc0xpc3QuYWRkKGBjb2xgKTtcblxuICAgICAgaWYgKCBtYXBbaV1bal0gKSB7XG4gICAgICAgIGNvbC5jbGFzc0xpc3QuYWRkKCdlbXB0eScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sLmNsYXNzTGlzdC5hZGQoJ3dhbGwnKTtcbiAgICAgIH1cblxuICAgICAgcm93LmFwcGVuZChjb2wpO1xuICAgIH1cblxuICAgIGdyaWQuYXBwZW5kKHJvdyk7XG4gIH1cblxuICByb290RWwuYXBwZW5kKGdyaWQpO1xufVxuXG5leHBvcnQgY29uc3QgdHVybWl0ZXNOVGltZXMgPSAodGltZXMpID0+IHtcbiAgbGV0IGdyaWQgPSBzcXVhcmVHcmlkKDE1MCk7XG4gIGxldCB4ID0gNzU7XG4gIGxldCB5ID0gNzU7XG4gIGxldCBzdGF0ZSA9IDA7XG4gIGxldCBkaXJYID0gLSAxO1xuICBsZXQgZGlyWSA9IDA7XG5cbiAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGltZXM7IGkrKyApIHtcbiAgICBbeCwgeSwgZ3JpZCwgZGlyWCwgZGlyWSwgc3RhdGVdID0gdHVybWl0ZXMoLi4uW3gsIHksIGdyaWQsIGRpclgsIGRpclksIHN0YXRlXSk7XG4gIH1cblxuICByZXR1cm4gZ3JpZDtcbn1cblxuY29uc3Qgc3F1YXJlR3JpZCA9IChuKSA9PiB7XG4gIGxldCBncmlkID0gbmV3IEFycmF5KG4pO1xuXG4gIGZvciAoIGxldCBpID0gMDsgaSA8IGdyaWQubGVuZ3RoOyBpKysgKSB7XG4gICAgZ3JpZFtpXSA9IG5ldyBBcnJheShuKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyaWRbaV0ubGVuZ3RoOyBqKysgKSB7XG4gICAgICBncmlkW2ldW2pdID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ3JpZDtcbn1cblxuY29uc3QgdHVybWl0ZXMgPSAoeCwgeSwgZ3JpZCwgZGlyWCwgZGlyWSwgc3RhdGUpID0+IHtcblxuICBpZiAoIG91dE9mQm91bmRzKGdyaWQsIHgsIHkpICkge1xuICAgIHJldHVybiBcImVycm9yXCJcbiAgfSBlbHNlIGlmICggZ3JpZFt4XVt5XSA9PT0gdHJ1ZSAmJiBzdGF0ZSA9PT0gMCApe1xuICAgIGdyaWRbeF1beV0gPSBmYWxzZTtcbiAgICBbZGlyWCwgZGlyWV0gPSBuaW5ldHlEZWdyZWVzUmlnaHQoZGlyWCwgZGlyWSk7XG4gICAgc3RhdGUgPSAwO1xuICAgIHJldHVybiBbeCArIGRpclgsIHkgKyBkaXJZLCBncmlkLCBkaXJYLCBkaXJZLCBzdGF0ZV1cbiAgfSBlbHNlIGlmICggZ3JpZFt4XVt5XSA9PT0gdHJ1ZSAmJiBzdGF0ZSA9PT0gMSApIHtcbiAgICBncmlkW3hdW3ldID0gdHJ1ZTtcbiAgICBzdGF0ZSA9IDA7XG4gICAgcmV0dXJuIFt4ICsgZGlyWCwgeSArIGRpclksIGdyaWQsIGRpclgsIGRpclksIHN0YXRlXVxuICB9IGVsc2UgaWYgKCBncmlkW3hdW3ldID09PSBmYWxzZSAmJiBzdGF0ZSA9PT0gMCApIHtcbiAgICBncmlkW3hdW3ldID0gZmFsc2U7XG4gICAgW2RpclgsIGRpclldID0gbmluZXR5RGVncmVlc1JpZ2h0KGRpclgsIGRpclkpO1xuICAgIHN0YXRlID0gMTtcbiAgICByZXR1cm4gW3ggKyBkaXJYLCB5ICsgZGlyWSwgZ3JpZCwgZGlyWCwgZGlyWSwgc3RhdGVdXG4gIH0gZWxzZSB7XG4gICAgZ3JpZFt4XVt5XSA9IHRydWU7XG4gICAgc3RhdGUgPSAxO1xuICAgIHJldHVybiBbeCArIGRpclgsIHkgKyBkaXJZLCBncmlkLCBkaXJYLCBkaXJZLCBzdGF0ZV1cbiAgfVxufVxuXG5jb25zdCBuaW5ldHlEZWdyZWVzUmlnaHQgPSAoZGlyWCwgZGlyWSkgPT4ge1xuICBpZiAoIGRpclggPT09IDAgKSB7XG4gICAgcmV0dXJuIFtkaXJZLCAwXVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBbMCwgLWRpclggXVxuICB9XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./javascript/caverns.js\n");

/***/ }),

/***/ "./javascript/characters.js":
/*!**********************************!*\
  !*** ./javascript/characters.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Character {\n  constructor(options) {\n    this.pos = options.pos;\n    this.game = options.game;\n    this.radius = options.radius;\n  }\n\n  isCollidedWith(otherObject) {\n    return this.pos === otherObject.pos\n  }\n\n  remove() {\n    this.game.remove(this);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Character);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L2NoYXJhY3RlcnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L2NoYXJhY3RlcnMuanM/NjUzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBDaGFyYWN0ZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5wb3MgPSBvcHRpb25zLnBvcztcbiAgICB0aGlzLmdhbWUgPSBvcHRpb25zLmdhbWU7XG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cztcbiAgfVxuXG4gIGlzQ29sbGlkZWRXaXRoKG90aGVyT2JqZWN0KSB7XG4gICAgcmV0dXJuIHRoaXMucG9zID09PSBvdGhlck9iamVjdC5wb3NcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmdhbWUucmVtb3ZlKHRoaXMpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXJhY3RlcjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./javascript/characters.js\n");

/***/ }),

/***/ "./javascript/game.js":
/*!****************************!*\
  !*** ./javascript/game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./javascript/player.js\");\n/* harmony import */ var _caverns_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./caverns.js */ \"./javascript/caverns.js\");\n\n\n\nclass Game {\n  constructor(options) {\n    this.player = [];\n    this.enemies = [];\n    this.treasures = [];\n\n    \n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L2dhbWUuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L2dhbWUuanM/OGVlYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyLmpzJztcbmltcG9ydCB7IGdlbmVyYXRlTWFwLCB0dXJtaXRlc05UaW1lcywgZHJhd01hcCB9IGZyb20gJy4vY2F2ZXJucy5qcyc7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5wbGF5ZXIgPSBbXTtcbiAgICB0aGlzLmVuZW1pZXMgPSBbXTtcbiAgICB0aGlzLnRyZWFzdXJlcyA9IFtdO1xuXG4gICAgXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./javascript/game.js\n");

/***/ }),

/***/ "./javascript/game_view.js":
/*!*********************************!*\
  !*** ./javascript/game_view.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L2dhbWVfdmlldy5qcy5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./javascript/game_view.js\n");

/***/ }),

/***/ "./javascript/player.js":
/*!******************************!*\
  !*** ./javascript/player.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _characters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characters.js */ \"./javascript/characters.js\");\n\n\nconst DEFAULTS = {\n  RADIUS: 16\n}\n\nclass Player extends _characters_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(options = {}) {\n    debugger;\n    options.radius = DEFAULTS.RADIUS;\n\n    super(options);\n  }\n\n  collidedWith(otherObject) {\n    // if (otherObject instanceof Enemy) {\n    //   this.remove();\n    //   return true;\n    // } else if ( otherObject instance of Laser ) {\n    //   this.remove();\n    //   otherObject.remove();\n    //   return true;\n    // }\n    //\n    // return false;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L3BsYXllci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2phdmFzY3JpcHQvcGxheWVyLmpzP2ZjYzIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENoYXJhY3RlciBmcm9tICcuL2NoYXJhY3RlcnMuanMnO1xuXG5jb25zdCBERUZBVUxUUyA9IHtcbiAgUkFESVVTOiAxNlxufVxuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBDaGFyYWN0ZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICBvcHRpb25zLnJhZGl1cyA9IERFRkFVTFRTLlJBRElVUztcblxuICAgIHN1cGVyKG9wdGlvbnMpO1xuICB9XG5cbiAgY29sbGlkZWRXaXRoKG90aGVyT2JqZWN0KSB7XG4gICAgLy8gaWYgKG90aGVyT2JqZWN0IGluc3RhbmNlb2YgRW5lbXkpIHtcbiAgICAvLyAgIHRoaXMucmVtb3ZlKCk7XG4gICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9IGVsc2UgaWYgKCBvdGhlck9iamVjdCBpbnN0YW5jZSBvZiBMYXNlciApIHtcbiAgICAvLyAgIHRoaXMucmVtb3ZlKCk7XG4gICAgLy8gICBvdGhlck9iamVjdC5yZW1vdmUoKTtcbiAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./javascript/player.js\n");

/***/ }),

/***/ "./javascript/space_spelunkers.js":
/*!****************************************!*\
  !*** ./javascript/space_spelunkers.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _caverns_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caverns.js */ \"./javascript/caverns.js\");\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ \"./javascript/game.js\");\n/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game_view.js */ \"./javascript/game_view.js\");\n/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_game_view_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvasEl = document.getElementById(\"canvas\");\n  console.log(canvasEl);\n  canvasEl.width = 80;\n  canvasEl.height = 80;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const game = new _game_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  new _game_view_js__WEBPACK_IMPORTED_MODULE_2___default.a(game, ctx).start();\n\n})\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qYXZhc2NyaXB0L3NwYWNlX3NwZWx1bmtlcnMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L3NwYWNlX3NwZWx1bmtlcnMuanM/NTg2NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZW5lcmF0ZU1hcCwgZHJhd01hcCB9IGZyb20gJy4vY2F2ZXJucy5qcydcbmltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgR2FtZVZpZXcgZnJvbSAnLi9nYW1lX3ZpZXcuanMnO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhc0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gIGNvbnNvbGUubG9nKGNhbnZhc0VsKTtcbiAgY2FudmFzRWwud2lkdGggPSA4MDtcbiAgY2FudmFzRWwuaGVpZ2h0ID0gODA7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzRWwuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcbiAgbmV3IEdhbWVWaWV3KGdhbWUsIGN0eCkuc3RhcnQoKTtcblxufSlcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./javascript/space_spelunkers.js\n");

/***/ })

/******/ });