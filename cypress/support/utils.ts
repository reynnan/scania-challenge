import { RouteMatcher } from "../../node_modules/cypress/types/net-stubbing";

type PromiseResolver = (value?: unknown) => void;

export function interceptIndefinitely(
  requestMatcher: RouteMatcher,
  response?: any
): { sendResponse: () => void } {
  let sendResponse: PromiseResolver = () => null;

  const trigger = new Promise((resolve) => {
    sendResponse = resolve;
  });

  cy.intercept(requestMatcher, (request) => {
    return trigger.then(() => {
      request.reply(response);
    });
  });

  return { sendResponse };
}
