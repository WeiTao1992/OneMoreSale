import React from 'react';
export var getValidChildren = function getValidChildren(children) {
  // .toArray automatically removes invalid React children
  return React.Children.toArray(children);
};

var getMax = function getMax(a, b) {
  return a > b ? a : b;
};

var getHeightOfSlide = function getHeightOfSlide(slide) {
  if (!slide) {
    return 0;
  }

  if (slide.children && slide.children.length > 0) {
    var totalHeight = 0;

    for (var i = 0; i < slide.children.length; ++i) {
      totalHeight += slide.children[i].offsetHeight;
    }

    return totalHeight;
  } else {
    return slide.offsetHeight;
  }
}; // end - is exclusive


export var findMaxHeightSlideInRange = function findMaxHeightSlideInRange(slides, start, end) {
  var maxHeight = 0;

  if (slides.length === 0 || start < 0 || end < 0 || start > slides.length - 1 || end > slides.length) {
    return maxHeight;
  }

  if (start < end) {
    for (var i = start; i < end; i++) {
      maxHeight = getMax(getHeightOfSlide(slides[i]), maxHeight);
    }
  } else if (start > end) {
    // Finding max in a wrap around
    for (var _i = start; _i < slides.length; _i++) {
      maxHeight = getMax(getHeightOfSlide(slides[_i]), maxHeight);
    }

    for (var _i2 = 0; _i2 < end; _i2++) {
      maxHeight = getMax(getHeightOfSlide(slides[_i2]), maxHeight);
    }
  } else {
    // start === end
    maxHeight = getHeightOfSlide(slides[start]);
  }

  return maxHeight;
};

var ensureIndexInBounds = function ensureIndexInBounds(index, slideCount) {
  var newIndex = index;

  while (newIndex < 0) {
    newIndex += slideCount;
  }

  while (newIndex > slideCount) {
    newIndex -= slideCount;
  }

  return newIndex;
};

export var findCurrentHeightSlide = function findCurrentHeightSlide(currentSlide, slidesToShow, alignment, wrapAround, slides) {
  if (slidesToShow > 1) {
    var startIndex = currentSlide;
    var lastIndex = Math.min(Math.ceil(slidesToShow) + currentSlide, slides.length);
    var offset = alignment === 'center' ? (slidesToShow - 1) / 2 : slidesToShow - 1;

    switch (alignment) {
      case 'center':
        startIndex = Math.floor(currentSlide - offset);
        lastIndex = Math.ceil(currentSlide + offset) + 1;
        break;

      case 'right':
        startIndex = Math.floor(currentSlide - offset);
        lastIndex = currentSlide + 1;
        break;

      case 'left':
        startIndex = currentSlide;
        lastIndex = Math.ceil(currentSlide + offset) + 1;
        break;
    } // inclusive


    startIndex = wrapAround ? ensureIndexInBounds(startIndex, slides.length) : Math.max(startIndex, 0); // exclusive

    lastIndex = wrapAround ? ensureIndexInBounds(lastIndex, slides.length) : Math.min(lastIndex, slides.length);
    return findMaxHeightSlideInRange(slides, startIndex, lastIndex);
  } else {
    return getHeightOfSlide(slides[currentSlide]);
  }
};
export var calculateSlideHeight = function calculateSlideHeight(props, state) {
  var childNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var heightMode = props.heightMode,
      vertical = props.vertical,
      initialSlideHeight = props.initialSlideHeight,
      wrapAround = props.wrapAround;
  var slidesToShow = state.slidesToShow,
      currentSlide = state.currentSlide,
      cellAlign = state.cellAlign;
  var firstSlide = childNodes[0];

  if (firstSlide && heightMode === 'first') {
    return vertical ? getHeightOfSlide(firstSlide) * slidesToShow : getHeightOfSlide(firstSlide);
  }

  if (heightMode === 'max') {
    return findMaxHeightSlideInRange(childNodes, 0, childNodes.length);
  }

  if (heightMode === 'current') {
    return findCurrentHeightSlide(currentSlide, slidesToShow, cellAlign, wrapAround, childNodes);
  }

  return initialSlideHeight || 100;
};