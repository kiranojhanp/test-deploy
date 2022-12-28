import renderer from "react-test-renderer";
import { expect, test } from "vitest";

import Copyright from "../Copyright";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();

  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);

  return result as renderer.ReactTestRendererJSON;
}

test("Component matches snapshot", () => {
  const component = renderer.create(
    <Copyright
      holder={"Dzango technologies"}
      url={"https://www.dzangolab.com"}
    />
  );
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
