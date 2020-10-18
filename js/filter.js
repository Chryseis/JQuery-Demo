let tree = [
  {
    name: "allen",
    children: [
      {
        name: "allen1",
        children: [
          { name: "helen1", children: [{ name: "allen5" }] },
          { name: "allen2" }
        ]
      },
      { name: "helen" }
    ]
  },
  {
    name: "allen3",
    children: [
      { name: "helen2", children: [{ name: "allen4" }, { name: "helen3" }] }
    ]
  }
];

let distTree = [];

let distNode = null;

let level = 0;

for (let i = 0; i < tree.length; i++) {
  console.log("node", i);
  if (tree[i].name.indexOf("allen") > -1) {
    distNode = distNode
      ? {
          ...distNode,
          children: [{ name: tree[i].name }],
          level: level
        }
      : { name: tree[i].name };
  } else {
    distNode = distNode
      ? {
          ...distNode,
          children: [{ name: tree[i].name }]
        }
      : { name: tree[i].name };
  }

  if (tree[i].children) {
    tree = tree[i].children;
    i--;
    level++;
  }
}

console.log(distNode);
