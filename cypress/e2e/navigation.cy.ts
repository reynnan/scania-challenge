describe("Navigation", () => {
  beforeEach(function () {
    cy.visit("/");
  });

  it("should render title and favorite meals", () => {
    cy.get("header").should("exist");
    cy.get("header").should("contain", "Ratatouille AI");
    cy.get("header").should("contain", "Favorite Meals");
  });

  it("should navigate to the favorites page", () => {
    cy.visit("/");
    cy.get('a[href*="favorite"]').click();
    cy.url().should("include", "/favorites");
    cy.get("input").should(
      "have.attr",
      "placeholder",
      "Search for your favorite meals here"
    );
  });

  it("should navigate to home page from favorites", () => {
    cy.visit("/favorites");
    cy.get('a[href="/"]').first().click();
    cy.url().should("include", "/");
  });
});
