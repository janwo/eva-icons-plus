/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

const fs = require('fs-extra');
const path = require('path');

const fileSystemHelper = require('../helpers/fs-helper');
const optimizeSvg = require('./oprimize-svg');

const processSvgs = (svgFiles, srcPath, desPath) => {
  fileSystemHelper.mkDirByPathSync(desPath);

  return Promise.all(svgFiles.map((svgFile) => {
    const svgPath = path.join(srcPath, svgFile);
    const desSvgPath = path.join(desPath, svgFile);
    const svg = fs.readFileSync(svgPath);

    const processedSvg = optimizeSvg(svg, [{ name: "removeHiddenElems", active: false }])
    fs.writeFileSync(desSvgPath, processedSvg.data);
  }));
};

module.exports = processSvgs;
