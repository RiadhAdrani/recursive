export default function ({
     mainAxisAlignment,
     verticalAlignment,
     position,
     top,
     bottom,
     right,
     left,
     float,
     margin = {
          all: null,
          vertical: null,
          horizontal: null,
          left: null,
          right: null,
          top: null,
          bottom: null,
     },
}) {
     return { ...arguments[0] };
}
