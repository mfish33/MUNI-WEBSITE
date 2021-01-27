import { TestBed } from "@angular/core/testing";

import { ContentfulService } from "./contentful.service";

describe("ContentfulService", () => {
  function setup() {
    const progressTrackerSpy = jasmine.createSpyObj("progressTrackerSpy", [
      "hasVisited",
    ]);
    const contentfulService = new ContentfulService(progressTrackerSpy);
    return { progressTrackerSpy, contentfulService };
  }

  it("should get the courses by order", () => {
    const { progressTrackerSpy, contentfulService } = setup();
    
  });
});
