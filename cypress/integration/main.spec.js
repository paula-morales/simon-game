/// <reference types="cypress" />

describe("example simon game app", () => {
  beforeEach(() => {
    cy.visit("https://simon-game-13-12.netlify.app/");
  });

  it("show an alert", () => {
    cy.get("[data-role=js-alert]").should("have.length", 1);
  });

  it("should set the name of the player", () => {
    const name = "Paula";

    cy.get(".simon-game__form")
      .find('[type="text"]')
      .type(name)
      .should("have.value", name);

    cy.get(".simon-game__form").submit();
    cy.get("[data-role=js-info]").should("have.text", `Player: ${name}`);
  });
});
