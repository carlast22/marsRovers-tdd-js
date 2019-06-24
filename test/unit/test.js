var assert = require("assert");
const chai = require("chai");
const Chance = require("chance");
var expect = chai.expect;

const leftTurn = {
  N: "W",
  W: "S",
  S: "E",
  E: "N"
};

const rightTurn = {
  N: "E",
  W: "N",
  S: "W",
  E: "S"
};

const move = (initialPosition, movement) => {
  const initialParts = initialPosition.split(" ");
  const initialX = parseInt(initialParts[0], 10);
  const initialY = parseInt(initialParts[1], 10);
  const initialDirection = initialParts[2];
  const movementPlan = movement.split("");

  let deltaX = 0;
  let deltaY = 0;
  let finalDirection = initialDirection;
  movementPlan.forEach(element => {
    switch (element) {
      case "M":
        switch (finalDirection) {
          case "N":
            deltaY++;
            break;
          case "S":
            deltaY--;
            break;
          case "E":
            deltaX++;
            break;
          case "W":
            deltaX--;
            break;
        }
        break;
      case "L":
        finalDirection = leftTurn[finalDirection];
        break;
      case "R":
        finalDirection = rightTurn[finalDirection];
        break;
    }
  });
  const finalX = initialX + deltaX;
  const finalY = initialY + deltaY;

  return `${finalX} ${finalY} ${finalDirection}`;
};

describe("Mars Rovers", function() {
  describe("#move", function() {
    const chance = new Chance();
    let yPosition;
    let xPosition;
    this.beforeEach(() => {
      yPosition = chance.natural({ min: 0, max: 100 });
      xPosition = chance.natural({ min: 0, max: 100 });
    });

    it("should move one step in the direction the rover is heading", function() {
      const initialPosition = `0 ${yPosition} N`;
      const movement = "M";
      const currentPosition = move(initialPosition, movement);
      expect(currentPosition).to.equal(`0 ${yPosition + 1} N`);
    });

    it("should move two steps in the direction the rover is heading if called twice", function() {
      const initialPosition = `0 ${yPosition} N`;
      const movement = "MM";
      const currentPosition = move(initialPosition, movement);
      expect(currentPosition).to.equal(`0 ${yPosition + 2} N`);
    });

    it("should move one step in the direction the rover is heading where the direction is S", function() {
      const initialPosition = `0 ${yPosition} S`;
      const movement = "M";
      const currentPosition = move(initialPosition, movement);
      expect(currentPosition).to.equal(`0 ${yPosition - 1} S`);
    });

    it("should move one step in the direction the rover is heading where the direction is E", function() {
      const initialPosition = `${xPosition} 0 E`;
      const movement = "M";
      const currentPosition = move(initialPosition, movement);
      expect(currentPosition).to.equal(`${xPosition + 1} 0 E`);
    });

    it("should move one step in the direction the rover is heading where the direction is W", function() {
      const initialPosition = `${xPosition} 0 W`;
      const movement = "M";
      const currentPosition = move(initialPosition, movement);
      expect(currentPosition).to.equal(`${xPosition - 1} 0 W`);
    });
  });

  describe("#turning", () => {
    describe("left", () => {
      it("should face W when movement is L and initial direction is N", () => {
        const initialPosition = "0 0 N";
        const direction = "L";
        const currentPosition = move(initialPosition, direction);
        expect(currentPosition).to.equal("0 0 W");
      });

      it("should face S when movement is L and initial direction is W", () => {
        const initialPosition = "0 0 W";
        const direction = "L";
        const currentPosition = move(initialPosition, direction);
        expect(currentPosition).to.equal("0 0 S");
      });

      it("should face E when movement is L and initial direction is S", () => {
        const initialPosition = "0 0 S";
        const direction = "L";
        const currentPosition = move(initialPosition, direction);
        expect(currentPosition).to.equal("0 0 E");
      });

      it("should face N when movement is L and initial direction is E", () => {
        const initialPosition = "0 0 E";
        const direction = "L";
        const currentPosition = move(initialPosition, direction);
        expect(currentPosition).to.equal("0 0 N");
      });

      it("should face W when movement is LL and initial direction is E", () => {
        const initialPosition = "0 0 E";
        const direction = "LL";
        const currentPosition = move(initialPosition, direction);
        expect(currentPosition).to.equal("0 0 W");
      });
    });
  });

  describe("right", () => {
    it("should face E when movement is R and initial direction is N", () => {
      const initialPosition = "0 0 N";
      const direction = "R";
      const currentPosition = move(initialPosition, direction);
      expect(currentPosition).to.equal("0 0 E");
    });

    it("should face S when movement is R and initial direction is E", () => {
      const initialPosition = "0 0 E";
      const direction = "R";
      const currentPosition = move(initialPosition, direction);
      expect(currentPosition).to.equal("0 0 S");
    });

    it("should face W when movement is R and initial direction is S", () => {
      const initialPosition = "0 0 S";
      const direction = "R";
      const currentPosition = move(initialPosition, direction);
      expect(currentPosition).to.equal("0 0 W");
    });

    it("should face N when movement is R and initial direction is W", () => {
      const initialPosition = "0 0 W";
      const direction = "R";
      const currentPosition = move(initialPosition, direction);
      expect(currentPosition).to.equal("0 0 N");
    });

    it("should face S when movement is RR and initial direction is N", () => {
      const initialPosition = "0 0 N";
      const direction = "RR";
      const currentPosition = move(initialPosition, direction);
      expect(currentPosition).to.equal("0 0 S");
    });

    it("should face S when movement is LR and initial direction is S", () => {
      const initialPosition = "0 0 S";
      const direction = "LR";
      const currentPosition = move(initialPosition, direction);
      expect(currentPosition).to.equal("0 0 S");
    });
  });

  it("should return 1 3 N", () => {
    const initialPosition = "1 2 N";
    const direction = "LMLMLMLMM";
    const currentPosition = move(initialPosition, direction);
    expect(currentPosition).to.equal("1 3 N");
  });
});
