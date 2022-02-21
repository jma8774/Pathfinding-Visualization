// This file provides unit tests for my priority queue (min heap)
const { init, add, pop } = require("../algos/pq");

describe("Initialize", () => {
  let pq = [{ cost: 10 }, { cost: 5 }, { cost: 15 }];
  init(pq);
  test("it should initialize the min priority queue correctly", () => {
    expect(pq).toEqual([{ cost: 5 }, { cost: 10 }, { cost: 15 }]);
  });
});

describe("Add Item", () => {
  let pq = [];
  // Add item 1
  test("it should add 10 as new min", () => {
    add(pq, { cost: 10 });
    expect(pq[0]).toEqual({ cost: 10 });
  });
  // Add item 2
  test("it should add 5 as new min", () => {
    add(pq, { cost: 5 });
    expect(pq[0]).toEqual({ cost: 5 });
  });
  // Add item 2
  test("it should add 1 as new min", () => {
    add(pq, { cost: 1 });
    expect(pq[0]).toEqual({ cost: 1 });
  });
});

describe("Pop Item", () => {
  let pq = [];
  add(pq, { cost: 10 });
  add(pq, { cost: 5 });
  add(pq, { cost: 1 });
  // Pop item 1
  test("it should pop min 1", () => {
    expect(pop(pq)).toEqual({ cost: 1 });
  });
  // Pop item 2
  test("it should pop min 5", () => {
    expect(pop(pq)).toEqual({ cost: 5 });
  });
  // Pop item 3
  test("it should pop min 10", () => {
    expect(pop(pq)).toEqual({ cost: 10 });
  });
  // Pop empty priority queue
  test("it should pop empty priority queue", () => {
    expect(pop(pq)).toBeUndefined();
  });
});
