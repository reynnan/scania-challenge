import { recipeExample } from "../fixtures/recipeExample";
import { interceptIndefinitely } from "../support/utils";

describe("Home Page", () => {
  beforeEach(function () {
    cy.visit("/");
  });

  it("should show loading when submitting prompt", () => {
    cy.get("input")
      .should("have.attr", "placeholder", "Easy breakfast recipe")
      .type("Easy breakfast recipe");
    const interception = interceptIndefinitely(
      "/api/ratatouille",
      recipeExample
    );
    cy.get("form").find('button[type="submit"]').click();
    cy.get(".loading").then(() => {
      interception.sendResponse();
      cy.get(".loading").should("not.exist");
    });
  });

  it("should show recipe when submitting prompt", () => {
    cy.intercept("/api/ratatouille", recipeExample);
    cy.get("input")
      .should("have.attr", "placeholder", "Easy breakfast recipe")
      .type("Easy breakfast recipe");
    cy.get("form").find('button[type="submit"]').click();
    cy.get("h3").first().contains("Ratatouille Confit Byaldi");
    cy.get("h4").contains("Ingredients");
    cy.get("h4").contains("Instructions");
  });
});
