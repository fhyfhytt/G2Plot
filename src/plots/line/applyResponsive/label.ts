import * as _ from '@antv/util';
// import responsiveTheme from '../../../theme/responsive';
import Responsive from '../../../util/responsive/responsive';
import ShapeNodes from '../../../util/responsive/shapeNodes';

export default function responsivePointLabel(plot) {
  const responsiveTheme = plot.themeController.responsiveTheme;
  /** 判断是否应用响应式规则 */
  if (isPointLabel(plot)) {
    const labelShapes = plot.plot.get('elements')[0].get('labels');
    const nodes = new ShapeNodes({
      shapes: labelShapes,
    });
    const { constraints, rules } = responsiveTheme.label;
    new Responsive({
      nodes,
      constraints,
      rules,
      plot,
    });
  }
}

function isPointLabel(plot) {
  if (plot.line.label && plot.line.label.labelType && plot.line.label.labelType === 'point') {
    return true;
  }
  return false;
}

function getLocalMaxMin(width, nodes) {
  const batchNumber = 20;
  const batchSize = width / 20;
  const batches = [];
  /** 创建batch */
  for (let i = 0; i < batchNumber; i++) {
    const localLeft = i * batchSize;
    const localRight = (i + 1) * batchSize;
    const batchData = {
      range: [localLeft, localRight],
      nodes: [],
      min: Infinity,
      max: -Infinity,
    };
    batches.push(batchData);
  }
  /** 将nodes填入batch */
  _.each(nodes, (node) => {
    const batchIndex = Math.floor(nodes.center / batchSize);
    batches[batchIndex].nodes.push(node);
  });
}
