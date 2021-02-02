import { ProgressTrackerService } from "./progress-tracker.service";
import { Course } from "src/app/shared/models/contentfulTypes";

const testCourse: any = {
  courseImage: {} as any,
  courseTitle: "Test Course",
  courseDescription: {} as any,
  lessons: ["", "", "", ""] as any,
};

const testCourse2: any = {
  courseImage: {} as any,
  courseTitle: "Test Course2",
  courseDescription: {} as any,
  lessons: ["", "", "", ""] as any,
};

const testCourse3: any = {
  courseImage: {} as any,
  courseTitle: "Test Course3",
  courseDescription: {} as any,
  lessons: ["", "", "", ""] as any,
  shortName: "shorty",
};

const lids = ["12345", "67890"];

describe("ProgressTrackerService", () => {
  function setup() {
    const authSpy = jasmine.createSpyObj("authSpy", ["hasVisited"]);
    const afsSpy = jasmine.createSpyObj("afsSpy", ["collection"]);
    const progressTrackerService = new ProgressTrackerService(authSpy, afsSpy);
    return { authSpy, afsSpy, progressTrackerService };
  }

  it("should be created", () => {
    const { authSpy, afsSpy, progressTrackerService } = setup();
    expect(progressTrackerService).toBeTruthy();
  });

  it("should add a visited lesson", () => {
    const { authSpy, afsSpy, progressTrackerService } = setup();
    progressTrackerService.hasVisited(testCourse, lids[0]);
    progressTrackerService.progressReport.subscribe((report) => {
      expect(report).toEqual({ "Test Course": 0.25 });
    });
  });

  it("Work with multiple courses", () => {
    const { authSpy, afsSpy, progressTrackerService } = setup();
    progressTrackerService.hasVisited(testCourse, lids[0]);
    progressTrackerService.hasVisited(testCourse, lids[1]);
    progressTrackerService.hasVisited(testCourse2, lids[0]);
    progressTrackerService.progressReport.subscribe((report) => {
      expect(report).toEqual({
        "Test Course": 0.5,
        "Test Course2": 0.25,
      });
    });
  });

  it("should not double count already visited lessons", () => {
    const { authSpy, afsSpy, progressTrackerService } = setup();
    progressTrackerService.hasVisited(testCourse, lids[1]);
    progressTrackerService.hasVisited(testCourse, lids[1]);
    progressTrackerService.progressReport.subscribe((report) => {
      expect(report).toEqual({ "Test Course": 0.25 });
    });
  });

  it("should work with short names", () => {
    const { authSpy, afsSpy, progressTrackerService } = setup();
    progressTrackerService.hasVisited(testCourse, lids[1]);
    progressTrackerService.hasVisited(testCourse3, lids[1]);
    progressTrackerService.progressReport.subscribe((report) => {
      expect(report).toEqual({
        "Test Course": 0.25,
        shorty: 0.25,
      });
    });
  });
});
