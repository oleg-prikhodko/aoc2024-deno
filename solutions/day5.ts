import { readInput } from "../util.ts";

type Graph = Record<string, string[]>;
type ParentsCounter = Map<string, number>;

export function day5(filename = "5.txt") {
  const { edges, paths } = read(filename);
  const graph = buildGraph(edges);

  // ------- part 1 -------

  let correctSum = 0;

  for (const path of paths) {
    if (isCorrect(path, graph)) {
      correctSum += takeMid(path);
    }
  }

  // ------- part 2 -------

  let fixedSum = 0;

  for (const path of paths) {
    if (!isCorrect(path, graph)) {
      const fixed = fix(path, graph);
      fixedSum += takeMid(fixed);
    }
  }

  return [correctSum, fixedSum];
}

function read(filename: string) {
  const contents = readInput(filename);
  const [edgesRaw, pathsRaw] = contents.split("\n\n");

  return {
    edges: edgesRaw.split("\n").map((edge) => edge.split("|")),
    paths: pathsRaw.split("\n").map((path) => path.split(",")),
  };
}

function buildGraph(edges: string[][]) {
  const graph: Graph = {};

  for (const [parent, child] of edges) {
    if (!graph[parent]) {
      graph[parent] = [];
    }
    if (!graph[child]) {
      graph[child] = [];
    }
    graph[parent].push(child);
  }

  return graph;
}

function isCorrect(path: string[], graph: Graph) {
  let parent = path[0];

  for (let i = 1; i < path.length; i++) {
    const children = graph[parent];
    const current = path[i];
    if (!children.includes(current)) {
      return false;
    }
    parent = current;
  }

  return true;
}

function countParents(path: string[], graph: Graph) {
  const parents = new Map<string, number>();

  for (const node of path) {
    parents.set(node, 0);
  }

  for (const node of path) {
    const children = graph[node];
    for (const child of children) {
      if (path.includes(child)) {
        parents.set(child, parents.get(child)! + 1);
      }
    }
  }

  return parents;
}

function findNextNode(parents: ParentsCounter) {
  for (const [node, count] of parents) {
    if (count === 0) {
      return node;
    }
  }

  throw new Error("Could not find start node");
}

function fix(path: string[], graph: Graph) {
  const parents = countParents(path, graph);
  const res: string[] = [];

  while (parents.size > 0) {
    const cur = findNextNode(parents);
    res.push(cur);
    for (const child of graph[cur]) {
      if (parents.has(child)) {
        parents.set(child, parents.get(child)! - 1);
      }
    }
    parents.delete(cur);
  }

  return res;
}

function takeMid(path: string[]) {
  const mid = Math.floor(path.length / 2);

  return Number(path[mid]);
}

if (import.meta.main) {
  console.log(day5());
}
