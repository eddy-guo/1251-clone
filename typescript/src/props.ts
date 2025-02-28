// props example

// the props object type
// make all properties in props object optional

type ShapeProps = {
  colour?: string;
  size?: number;
};


// leave one property out when creating prop object
const props: ShapeProps = { size: 30 };
console.log(`Shape: ${props.colour}, ${props.size}`);

// destructure props
let {colour = "red", size = 10}  = props;
console.log(`Shape: ${colour}, ${size}`);

// create a function that takes props object as argument,
// set default values when destructuring props object
function printProps({colour = "yellow", size = 10}: ShapeProps) {
  console.log(`Shape: ${colour}, ${size}`);
}

// try different combinations including {}
printProps({"colour": "blue"});
printProps({"colour": "blue", "size": 20});

// try calling function with no arguments, what happens? how to fix?
printProps({});
props.size = 40;
printProps(props);
